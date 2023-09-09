const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function playAudioWithVlc(fileName) {
  try {
    console.log('Playing mp3 file with vlc...');
    await exec(`vlc ${fileName}`);
    console.log('Mp3 file played successfully.');
  } catch (error) {
    console.error('Unable to play mp3 file with vlc:', error);
    throw error;
  }
}

module.exports = playAudioWithVlc;
