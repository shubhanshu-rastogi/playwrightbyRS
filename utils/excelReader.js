const xlsx = require('xlsx');
const path = require('path');

function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet); // returns an array of objects
}

module.exports = { readExcel };