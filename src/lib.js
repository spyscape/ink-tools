const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { v4: uuidv4 } = require('uuid');
const { getInklecateBin } = require('./Command/get-inklecate-bin');

function compile(inkScript) {
  const inklecateBin = getInklecateBin();
  const uniqueId = uuidv4();
  const inkFilePath = path.resolve(`__TEMP-INK_${uniqueId}.ink`);
  const outputFilePath = `${inkFilePath}.json`;
  const inklecateCmd = `${inklecateBin} ${inkFilePath}`;
  fs.writeFileSync(inkFilePath, inkScript);
  shell.exec(inklecateCmd);
  const inkJson = fs.readFileSync(outputFilePath, 'utf8');
  shell.rm(`${inkFilePath}*`);

  return inkJson;
}

module.exports = {
  compile: compile,
}
