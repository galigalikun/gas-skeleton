function getData() {
    const sheet = SpreadsheetApp.getActive().getSheetByName("シート1");
    if (sheet != null) {
        const rows = sheet.getDataRange().getValues();
        const keys: string[] = rows.splice(0, 1)[0];
        const obj: { [key: string]: string[] } = {};

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (keys[j].length == 0) {
                    continue;
                }
                if (!obj[keys[j]]) {
                    obj[keys[j]] = [];
                }
                if (rows[i][j].length > 0) {
                    obj[keys[j]].push(rows[i][j]);
                }
            }
        }
        return obj;
    }
}

function doGet() {
    const data = getData();
    return ContentService.createTextOutput(
        JSON.stringify(data, null, 2)
    ).setMimeType(ContentService.MimeType.JSON);
}
