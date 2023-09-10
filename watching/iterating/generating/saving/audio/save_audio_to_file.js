const ProgressBar = require('progress');
const logger = require('loggers');
const fs = require('fs');
const path = require('path');

async function saveAudioToFile(fileName, dataStream, estimatedSize) {
  const resolvedPath = path.resolve('downloads', fileName);

  return new Promise((resolve, reject) => {
    logger.initialize('Beginning data stream...');
    const writeStream = fs.createWriteStream(resolvedPath);

    let bytesReceived = 0;

    const bar = new ProgressBar(':bar :percent', {
      complete: '=',
      incomplete: ' ',
      width: 40,
      total: estimatedSize,
    });

    dataStream.on('data', (chunk) => {
      bytesReceived += chunk.length;
      bar.tick(chunk.length);
    });

    dataStream.on('error', (error) => {
      logger.error('Error reading from the data stream:', error);
      reject(error);
    });

    writeStream.on('error', (error) => {
      logger.error('Error writing to file:', error);
      reject(error);
    });

    writeStream.on('close', () => {
      logger.success('Audio successfully saved to mp3 file.');
      resolve();
    });

    dataStream.pipe(writeStream);
  });
}

module.exports = saveAudioToFile;
