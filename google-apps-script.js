// DELICATE FLOWERS - GOOGLE SHEETS INTEGRATION
// Spreadsheet ID: 1E1p0Ofl-yCoK16Bb3hqWIRNXwMRHmV167CxDOz1oX_U
// Copy ALL of this code into Apps Script (Extensions > Apps Script)
// Then Deploy > New Deployment > Web App > Execute as: Me > Access: Anyone

var SPREADSHEET_ID = '1E1p0Ofl-yCoK16Bb3hqWIRNXwMRHmV167CxDOz1oX_U';

function doPost(e) {
  try {
    // Get data from request
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    // Open spreadsheet by ID (required for standalone script)
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getActiveSheet();
    
    // Add row with timestamp
    sheet.appendRow([
      new Date().toLocaleString(),  // Timestamp
      data.name || '',              // Name
      data.email || '',             // Email  
      data.phoneNumber || '',       // Phone
      data.eventType || '',         // Event Type
      data.eventDate || '',         // Date
      data.location || '',          // Location
      data.guestSize || '',         // Guest Size
      data.message || '',           // Message
      data.referredBy || ''         // Referred By
    ]);
    
    // Send email to April
    MailApp.sendEmail({
      to: 'april@delicateflowers.co',
      subject: 'New Consultation: ' + (data.name || 'New Lead'),
      body: buildEmailBody(data),
      name: 'Delicate Flowers Website'
    });
    
    // Return success
    return ContentService
      .createTextOutput('{"result":"success"}')
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput('{"result":"error","message":"' + error.toString() + '"}')
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildEmailBody(data) {
  return 'New consultation form submitted:\n\n' +
    'NAME: ' + (data.name || 'Not provided') + '\n' +
    'EMAIL: ' + (data.email || 'Not provided') + '\n' +
    'PHONE: ' + (data.phoneNumber || 'Not provided') + '\n\n' +
    'EVENT DETAILS:\n' +
    '- Type: ' + (data.eventType || 'Not specified') + '\n' +
    '- Date: ' + (data.eventDate || 'Not specified') + '\n' +
    '- Location: ' + (data.location || 'Not specified') + '\n' +
    '- Guest Count: ' + (data.guestSize || 'Not specified') + '\n\n' +
    'MESSAGE:\n' + (data.message || 'No message provided') + '\n\n' +
    'REFERRED BY: ' + (data.referredBy || 'Not specified') + '\n\n' +
    '---\n' +
    'View all submissions in Google Sheets';
}

// TEST - Run this to make sure it works
function test() {
  var testData = {
    name: 'Test Customer',
    email: 'test@example.com',
    phoneNumber: '(555) 123-4567',
    eventType: 'Mother\'s Day Special',
    eventDate: '2026-05-10',
    location: 'Palm Springs, CA',
    guestSize: '8 guests',
    message: 'This is a test submission',
    referredBy: 'Instagram'
  };
  
  var result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  Logger.log('Test result: ' + result.getContent());
}
