const fs = require('fs');

async function saveAudioToFile(fileName, audioBuffer) {
  try {
    console.log('Saving audio to mp3 file...');
    await fs.promises.writeFile(fileName, audioBuffer);
  } catch (error) {
    console.error('Error saving audio to mp3 file:', error);
    throw error;
  }
}

module.exports = saveAudioToFile;
