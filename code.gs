function setup() {
  var spreadsheetId = '10xbwhVtua_qn2y70cuYmdErqSFs6yvMf-WyQR_ik-Q8';
  var ss = SpreadsheetApp.openById(spreadsheetId);
  
  // Setup RSVP Sheet
  var rsvpSheet = ss.getSheetByName('rsvp');
  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet('rsvp');
  }
  if (rsvpSheet.getLastRow() === 0) {
    var rsvpHeaders = ['Submitted At', 'Name', 'Guests', 'Dietary Requirements', 'Source'];
    rsvpSheet.appendRow(rsvpHeaders);
    rsvpSheet.getRange(1, 1, 1, rsvpHeaders.length).setFontWeight('bold').setBackground('#f3f3f3');
    rsvpSheet.setFrozenRows(1);
  }

  // Setup Wish Sheet
  var wishSheet = ss.getSheetByName('wish');
  if (!wishSheet) {
    wishSheet = ss.insertSheet('wish');
  }
  if (wishSheet.getLastRow() === 0) {
    var wishHeaders = ['Submitted At', 'Name', 'Message', 'Source'];
    wishSheet.appendRow(wishHeaders);
    wishSheet.getRange(1, 1, 1, wishHeaders.length).setFontWeight('bold').setBackground('#f3f3f3');
    wishSheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var spreadsheetId = '10xbwhVtua_qn2y70cuYmdErqSFs6yvMf-WyQR_ik-Q8';
    var ss = SpreadsheetApp.openById(spreadsheetId);

    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(body);

    var formType = String(payload.formType || '').toLowerCase();
    var submittedAt = payload.submittedAt || new Date().toISOString();

    if (formType === 'rsvp') {
      var rsvpSheet = ss.getSheetByName('rsvp');
      if (!rsvpSheet) {
        rsvpSheet = ss.insertSheet('rsvp');
        rsvpSheet.appendRow(['Submitted At', 'Name', 'Guests', 'Dietary Requirements', 'Source']);
        rsvpSheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f3f3');
        rsvpSheet.setFrozenRows(1);
      }

      rsvpSheet.appendRow([
        submittedAt,
        payload.name || '',
        payload.guests || '',
        payload.dietary || '',
        payload.source || 'website',
      ]);
    } else if (formType === 'wish') {
      var wishSheet = ss.getSheetByName('wish');
      if (!wishSheet) {
        wishSheet = ss.insertSheet('wish');
        wishSheet.appendRow(['Submitted At', 'Name', 'Message', 'Source']);
        wishSheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#f3f3f3');
        wishSheet.setFrozenRows(1);
      }

      wishSheet.appendRow([
        submittedAt,
        payload.name || '',
        payload.message || '',
        payload.source || 'website',
      ]);
    } else {
      throw new Error('Invalid formType. Expected rsvp or wish.');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
