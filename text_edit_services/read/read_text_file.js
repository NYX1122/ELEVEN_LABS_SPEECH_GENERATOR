const fs = require('fs-extra');

async function readTextFile(path) {
  try {
    console.log('Reading file text...');
    const textString = await fs.readFile(path, 'utf8');
    console.log('Text has been read successfully.');
    return textString;
  } catch (err) {
    console.error('Error reading text:', err);
  }
}

module.exports = readTextFile;
