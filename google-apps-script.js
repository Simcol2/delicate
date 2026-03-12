// Google Apps Script Code for Delicate Flowers Contact Form
// Paste this in: Extensions → Apps Script

function doPost(e) {
  // Set CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
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
    
    // Send email notification to April
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS for CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
  var recipient = 'april@delicateflowers.co';
  var subject = 'New Consultation Booking - ' + data.name;
  
  var body = `
Hello April,

A new consultation form has been submitted:

NAME: ${data.name}
EMAIL: ${data.email}
PHONE: ${data.phoneNumber || 'Not provided'}

EVENT DETAILS:
- Type: ${data.eventType || 'Not specified'}
- Date: ${data.eventDate || 'Not specified'}
- Location: ${data.location || 'Not specified'}
- Guest Count: ${data.guestSize || 'Not specified'}

MESSAGE:
${data.message || 'No message'}

REFERRED BY: ${data.referredBy || 'Not specified'}

---
View all submissions: https://docs.google.com/spreadsheets/d/1E1p0Ofl-yCoK16Bb3hqWIRNXwMRHmV167CxDOz1oX_U/edit
  `;
  
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: body,
    name: 'Delicate Flowers Website'
  });
  
  Logger.log('Notification email sent to: ' + recipient);
}
