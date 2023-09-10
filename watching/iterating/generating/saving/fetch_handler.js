const logger = require('loggers');
const { getGeneratedAudio } = require('elevenLabsFetchers');
const saveAudioToFile = require('saveAudioToFile');

const fetchHandler = async (configData, text, fileName, charCount) => {
  try {
    logger.initialize('Handling fetch...');

    const response = await getGeneratedAudio(configData, text);

    const estimatedSize = charCount * 709.717;

    await saveAudioToFile(fileName, response.data, estimatedSize);

    logger.success('Fetch successfully handled.');
  } catch (error) {
    logger.error('Unable to handle fetch:', error);
    throw error;
  }
};

module.exports = fetchHandler;
