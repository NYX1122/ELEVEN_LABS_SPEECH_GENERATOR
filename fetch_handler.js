const customTextToSpeech = require('./custom_text_to_speech');
const saveAudioToFile = require('./save_audio_to_file');
const playAudioWithVlc = require('./play_audio_with_vlc');

const fetchHandler = async (configData, text) => {
  const fileName = text
    .slice(0, 17)
    .replace(',', '')
    .replaceAll(' ', '_')
    .concat('.mp3');

  try {
    console.log('Handling fetch...');

    const audioBuffer = await customTextToSpeech(configData, text);

    await saveAudioToFile(fileName, audioBuffer);

    await playAudioWithVlc(fileName);

    console.log('Fetch successfully handled.');
  } catch (error) {
    console.error('Unable to handle fetch:', error);
    throw error;
  }
};

module.exports = fetchHandler;
