const fs = require('fs');
const logger = require('loggers');
const path = require('path');
const { spawn } = require('child_process');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

async function playAudioWithVlc(fileName, retries = 5) {
  const absoluteFilePath = path.resolve('downloads', fileName);
  logger.initialize(`Trying to play: ${absoluteFilePath}`);

  if (!fileExists(absoluteFilePath)) {
    if (retries > 0) {
      logger.output(`File ${fileName} not found. Retrying in 2 seconds...`);
      await delay(2000); // Wait for 2 seconds before retrying
      return playAudioWithVlc(fileName, retries - 1);
    } else {
      throw new Error(
        `Failed to find file ${fileName} after multiple retries.`
      );
    }
  }

  return new Promise((resolve, reject) => {
    try {
      logger.initialize('Playing mp3 file with vlc...');

      const vlc = spawn('vlc', [absoluteFilePath]);

      vlc.on('error', async (error) => {
        if (retries > 0) {
          logger.output(
            `Error playing file ${fileName}. Retrying in 2 seconds...`
          );
          await delay(2000); // Wait for 2 seconds before retrying
          return resolve(playAudioWithVlc(fileName, retries - 1));
        } else {
          logger.error('Unable to play mp3 file with vlc:', error);
          reject(error);
        }
      });

      vlc.on('exit', async (code) => {
        if (code !== 0) {
          if (retries > 0) {
            logger.output(
              `VLC process exited with code ${code}. Retrying in 2 seconds...`
            );
            await delay(2000); // Wait for 2 seconds before retrying
            return resolve(playAudioWithVlc(fileName, retries - 1));
          } else {
            logger.error(`VLC process exited with code ${code}`);
            reject(new Error(`VLC process exited with code ${code}`));
          }
        } else {
          logger.success('Mp3 file played successfully.');
          resolve();
        }
      });
    } catch (error) {
      logger.error('Error:', error);
      reject(error);
    }
  });
}

module.exports = playAudioWithVlc;
