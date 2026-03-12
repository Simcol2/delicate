// Google Apps Script Code for Delicate Flowers Contact Form
// Instructions:
// 1. Paste this code in Extensions > Apps Script
// 2. Click Deploy > New Deployment
// 3. Type: Web app
// 4. Execute as: Me
// 5. Who has access: ANYONE (this is required for CORS)
// 6. Click Deploy and copy the URL

function doPost(e) {
  try {
    // Parse form data
    var postData = e.postData;
    var data = JSON.parse(postData.contents);
    
    // Log for debugging
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Add to spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phoneNumber || '',
      data.eventType || '',
      data.eventDate || '',
      data.location || '',
      data.guestSize || '',
      data.message || '',
      data.referredBy || ''
    ]);
    
    // Send notification email
    sendNotificationEmail(data);
    
    // Return success with text output (CORS friendly)
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'working'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
  try {
    var recipient = 'april@delicateflowers.co';
    var subject = 'New Booking - ' + (data.name || 'Unknown');
    
    var body = 'New consultation submission:\n\n' +
      'Name: ' + (data.name || 'N/A') + '\n' +
      'Email: ' + (data.email || 'N/A') + '\n' +
      'Phone: ' + (data.phoneNumber || 'N/A') + '\n' +
      'Event Type: ' + (data.eventType || 'N/A') + '\n' +
      'Date: ' + (data.eventDate || 'N/A') + '\n' +
      'Location: ' + (data.location || 'N/A') + '\n' +
      'Guests: ' + (data.guestSize || 'N/A') + '\n\n' +
      'Message:\n' + (data.message || 'None') + '\n\n' +
      'Referred By: ' + (data.referredBy || 'N/A');
    
    MailApp.sendEmail(recipient, subject, body);
    Logger.log('Email sent to ' + recipient);
  } catch (emailError) {
    Logger.log('Email error: ' + emailError.toString());
  }
}

// Test function - run this to verify setup
function testSubmission() {
  var testData = {
    name: 'Test User',
    email: 'test@test.com',
    phoneNumber: '555-1234',
    eventType: 'Dinner',
    eventDate: '2024-12-25',
    location: 'Palm Springs',
    guestSize: '8',
    message: 'Test message',
    referredBy: 'Google'
  };
  
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
  
  sendNotificationEmail(testData);
  Logger.log('Test completed!');
}
