const logger = require('loggers');
const generateAndSaveAudio = require('generateAndSaveAudio');
const playAudioWithVlc = require('playAudioWithVlc');

let currentFileIndex = 0;
let isPlayerRunning = false;

async function playNextFile(files) {
  if (!isPlayerRunning) {
    isPlayerRunning = true;
    while (currentFileIndex < files.length) {
      await playAudioWithVlc(files[currentFileIndex]);
      currentFileIndex++;
    }
    isPlayerRunning = false;
  }
}

async function generationIterator(array, configData) {
  const fileName = array[0].slice(0, 17).replace(',', '').replaceAll(' ', '_');
  let iteration = 0;
  const processedCharCounts = array.map((string) => string.length);
  const generatedFiles = [];
  for (const string of array) {
    try {
      const finalFileName =
        iteration !== 0
          ? fileName.concat('(' + iteration + ').mp3')
          : fileName.concat('.mp3');

      logger.initialize('Passing chunk to audio generator...');
      await generateAndSaveAudio(
        string,
        configData,
        finalFileName,
        iteration,
        processedCharCounts
      );

      generatedFiles.push(finalFileName);

      // Start playing after the first file is generated
      if (iteration === 0) {
        playNextFile(generatedFiles);
      }
    } catch (error) {
      logger.error('Error generating audio for chunk:', error);
      throw error;
    }

    iteration++;
  }
}

module.exports = generationIterator;
