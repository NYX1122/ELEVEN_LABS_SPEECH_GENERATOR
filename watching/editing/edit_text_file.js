const logger = require('loggers');
const {
  readTextFile,
  editPartTitle,
  removeListenToAudio,
  removeReferences,
  editSectionTitle,
  chunkStrings,
} = require('editTextServices');

async function editTextFile(path) {
  try {
    logger.initialize('Generating processed string...');

    const textString = await readTextFile(path);

    const linesArray = textString
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => line.replace('\r', ''));

    const tempArrayOne = editPartTitle(linesArray);

    const tempArrayTwo = removeListenToAudio(tempArrayOne);

    const tempArrayThree = editSectionTitle(tempArrayTwo);

    const tempArrayFour = removeReferences(tempArrayThree);

    const chunkArrays = chunkStrings(tempArrayFour, 5000);

    const joinedChunkArrays = chunkArrays.map((chunk) =>
      chunk.join('\r\n\r\n')
    );

    logger.success('Processed string has been generated.');
    return joinedChunkArrays;
  } catch (err) {
    logger.error('Error editing file:', err);
  }
}

module.exports = editTextFile;
