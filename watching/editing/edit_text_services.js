const logger = require('loggers');
const fs = require('fs-extra');

async function readTextFile(path) {
  try {
    logger.initialize('Reading file text...');
    const textString = await fs.readFile(path, 'utf8');
    logger.initialize('Text has been read successfully.');
    return textString;
  } catch (err) {
    logger.error('Error reading text:', err);
  }
}

function editPartTitle(array) {
  try {
    logger.initialize('Editing chapter part title...');
    const title = array[0];
    const chapter = array[1].charAt(0);
    const part = array[1].charAt(2);
    const fixedPartTitle =
      'Chapter ' + chapter + ', Part ' + part + ', ' + title;
    const tempArrayOne = array.filter((_, index) => index !== 1);
    const finalArray = tempArrayOne.map((line, index) =>
      index === 0 ? fixedPartTitle : line
    );
    logger.success('Chapter part title has been edited successfully.');
    return finalArray;
  } catch (err) {
    logger.error('Error editing chapter part title:', err);
  }
}

function removeListenToAudio(array) {
  try {
    logger.initialize('Removing listen to audio...');
    const finalArray = array.filter((line) => line !== 'Listen to the audio');
    logger.success('Listen to audio removed.');
    return finalArray;
  } catch (err) {
    logger.error('Error removing listen to audio:', err);
  }
}

function removeReferences(array) {
  try {
    logger.initialize('Removing references...');
    const finalArray = array.map((line) =>
      line.replaceAll(/(?<!\d\.)(?<=[\.\"\”A-Za-z])\d+/g, '')
    );
    logger.success('References removed.');
    return finalArray;
  } catch (err) {
    logger.error('Error removing references:', err);
  }
}

function editSectionTitle(array) {
  try {
    logger.initialize('Formatting section titles...');
    const finalArray = array.map((line) =>
      line.replace(/\d\.\d\.(\d)/g, 'Section $1,')
    );
    logger.success('Section titles formatted.');
    return finalArray;
  } catch (err) {
    logger.error('Error formatting section titles:', err);
  }
}

function chunkStrings(array, maxChars) {
  let chunks = [];
  let currentChunk = [];
  let currentLength = 0;

  for (let str of array) {
    // Calculate the extra length if this string is added
    const extraLength = currentLength === 0 ? str.length : str.length + 2;

    if (currentLength + extraLength <= maxChars) {
      currentChunk.push(str);
      currentLength += extraLength;
    } else {
      chunks.push(currentChunk);
      currentChunk = [str];
      currentLength = str.length;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

module.exports = {
  readTextFile,
  editPartTitle,
  removeListenToAudio,
  removeReferences,
  editSectionTitle,
  chunkStrings,
};
