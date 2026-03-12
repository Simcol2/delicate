// Google Apps Script Code for Delicate Flowers Contact Form
// Paste this in: Extensions → Apps Script

function doPost(e) {
  Logger.log('Received POST request');
  Logger.log('Post data: ' + JSON.stringify(e));
  
  try {
    // Parse the incoming data
    var postData = e.postData;
    if (!postData || !postData.contents) {
      throw new Error('No postData received');
    }
    
    var data = JSON.parse(postData.contents);
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add data to next row
    var row = [
      new Date(),                    // A: Timestamp
      data.name || '',               // B: Name
      data.email || '',              // C: Email
      data.phoneNumber || '',        // D: Phone
      data.eventType || '',          // E: Event Type
      data.eventDate || '',          // F: Date
      data.location || '',           // G: Location
      data.guestSize || '',          // H: Guest Size
      data.message || '',            // I: Message
      data.referredBy || ''          // J: Referred By
    ];
    
    sheet.appendRow(row);
    Logger.log('Row added to sheet');
    
    // Send email notification to April
    try {
      sendNotificationEmail(data);
      Logger.log('Email sent successfully');
    } catch (emailError) {
      Logger.log('Email error: ' + emailError.toString());
    }
    
    // Return success
    var output = ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Data saved and email sent'
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    var output = ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

// Handle GET requests for testing
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'success',
    message: 'Script is working! Use POST to submit form data.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
  var recipient = 'april@delicateflowers.co';
  var subject = 'New Consultation Booking - ' + (data.name || 'Unknown');
  
  var body = 'Hello April,\n\n' +
    'A new consultation form has been submitted:\n\n' +
    'NAME: ' + (data.name || '') + '\n' +
    'EMAIL: ' + (data.email || '') + '\n' +
    'PHONE: ' + (data.phoneNumber || 'Not provided') + '\n\n' +
    'EVENT DETAILS:\n' +
    '- Type: ' + (data.eventType || 'Not specified') + '\n' +
    '- Date: ' + (data.eventDate || 'Not specified') + '\n' +
    '- Location: ' + (data.location || 'Not specified') + '\n' +
    '- Guest Count: ' + (data.guestSize || 'Not specified') + '\n\n' +
    'MESSAGE:\n' + (data.message || 'No message') + '\n\n' +
    'REFERRED BY: ' + (data.referredBy || 'Not specified') + '\n\n' +
    '---\n' +
    'View all submissions: https://docs.google.com/spreadsheets/d/1E1p0Ofl-yCoK16Bb3hqWIRNXwMRHmV167CxDOz1oX_U/edit';
  
  MailApp.sendEmail(recipient, subject, body, {
    name: 'Delicate Flowers Website'
  });
  
  Logger.log('Notification email sent to: ' + recipient);
}

// TEST FUNCTION - Run this to test
function testEmail() {
  var testData = {
    name: 'Test User',
    email: 'test@example.com',
    phoneNumber: '(555) 123-4567',
    eventType: 'Mother\'s Day Special',
    eventDate: '2026-05-10',
    location: 'Palm Springs',
    guestSize: '8',
    message: 'This is a test message',
    referredBy: 'Google'
  };
  
  // Test sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    testData.name,
    testData.email,
    testData.phoneNumber,
    testData.eventType,
    testData.eventDate,
    testData.location,
    testData.guestSize,
    testData.message,
    testData.referredBy
  ]);
  Logger.log('Test row added');
  
  // Test email
  sendNotificationEmail(testData);
  Logger.log('Test email sent! Check april@delicateflowers.co');
}
