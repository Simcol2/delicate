// Google Apps Script Code for Delicate Flowers Contact Form
// Deploy as Web App with access to "Anyone"

function doPost(e) {
  Logger.log('=== POST REQUEST RECEIVED ===');
  Logger.log('e: ' + JSON.stringify(e));
  Logger.log('postData: ' + (e.postData ? 'exists' : 'missing'));
  
  try {
    // Check if postData exists
    if (!e.postData) {
      Logger.log('ERROR: No postData');
      return createResponse({result: 'error', error: 'No postData received'});
    }
    
    if (!e.postData.contents) {
      Logger.log('ERROR: No postData.contents');
      Logger.log('postData type: ' + typeof e.postData);
      Logger.log('postData keys: ' + Object.keys(e.postData).join(', '));
      return createResponse({result: 'error', error: 'No postData.contents'});
    }
    
    // Parse form data
    var data;
    try {
      data = JSON.parse(e.postData.contents);
      Logger.log('Parsed data: ' + JSON.stringify(data));
    } catch (parseError) {
      Logger.log('JSON parse error: ' + parseError.toString());
      Logger.log('Raw contents: ' + e.postData.contents);
      return createResponse({result: 'error', error: 'JSON parse error: ' + parseError.toString()});
    }
    
    // Add to spreadsheet
    try {
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
      Logger.log('Row added to sheet');
    } catch (sheetError) {
      Logger.log('Sheet error: ' + sheetError.toString());
      return createResponse({result: 'error', error: 'Sheet error: ' + sheetError.toString()});
    }
    
    // Send notification email
    try {
      sendNotificationEmail(data);
      Logger.log('Email sent');
    } catch (emailError) {
      Logger.log('Email error: ' + emailError.toString());
      // Don't fail if email fails, just log it
    }
    
    Logger.log('=== SUCCESS ===');
    return createResponse({result: 'success', message: 'Data saved and email sent'});
    
  } catch (error) {
    Logger.log('FATAL ERROR: ' + error.toString());
    return createResponse({result: 'error', error: error.toString()});
  }
}

function doGet(e) {
  return createResponse({status: 'working', timestamp: new Date().toISOString()});
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
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
}

// Test function
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
  
  // Simulate POST
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  return doPost(mockEvent);
}
