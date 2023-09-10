const logger = require('loggers');
const editTextFile = require('editTextFile');
const generationIterator = require('generationIterator');

async function watchAddHandler(path, configData) {
  logger.success('File detected!');
  logger.output(path);
  if (!path.endsWith('.txt')) {
    logger.error('Ignoring non-.txt file.');
    return;
  }

  logger.initialize('File is .txt, initializing text editor...');
  const joinedChunkArrays = await editTextFile(path);
  await generationIterator(joinedChunkArrays, configData);
  logger.success('Audio generated successfully.');
}

module.exports = watchAddHandler;
