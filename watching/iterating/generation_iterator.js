const generateAndSaveAudio = require('../../generate_and_save_audio');

async function generationIterator(array, configData) {
  for (const string of array) {
    try {
      console.log('Passing chunk to audio generator...');
      await generateAndSaveAudio(string, configData);
    } catch (err) {
      console.log('Error generating audio for chunk:', err);
    }
  }
}

module.exports = generationIterator;
