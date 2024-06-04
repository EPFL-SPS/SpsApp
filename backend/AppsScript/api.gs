const spreadsheetId = '1GnVV3331x36aRqYSuNnlR4qPDdrDRhLvNV4WEyNZLAI';

function _convertTable(table) {
    let data = [];
    let header = table[0];
    for (let i = 1; i < table.length; i++) {
        let row = table[i];
        let rowData = {};
        for (let j = 0; j < header.length; j++) {
            rowData[header[j]] = row[j] !== undefined ? row[j] : null;
        }
        data.push(rowData);
    }
    return data
}

function _sendResponse(e, status_code, range, status, data) {
  var response = {
      'status_code': status_code,
      'status': status,
      'data': data,
      'request': range
  };

  // Regular JSON response
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if(e) {
    var range = e.parameter.range

    if (range == undefined) {
      return _sendResponse(e, 400, e.parameter.range, "Bad Request", "Specify range as request parameter")
    }

    try {
        // Get the values from the spreadsheet using spreadsheetId and range.
        const values = Sheets.Spreadsheets.Values.get(spreadsheetId, range).values;

        console.log(values)
        
        return _sendResponse(e, 200, e.parameter.range, "OK", _convertTable(values))
        
      } catch (err) {
        // TODO Handle Values.get() exception from Sheet API
        console.log(err.message);

        return _sendResponse(e, 500, e.parameter.range, "Internal Server Error", err.message)
    }
  }
}

function doPost(e) {
    return true;
}