const logger = require('loggers');
const chokidar = require('chokidar');
const path = require('path');
const watchAddHandler = require('watchAddHandler');

function startWatching(configData) {
  const watchFolder = configData.folderToWatch;
  return new Promise((resolve, reject) => {
    logger.initialize('Initializing watcher...');
    const watcher = chokidar.watch(watchFolder, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    watcher
      .on('ready', () => {
        logger.success('Watcher initialized!');
        logger.output('Watching Path');
        logger.output(watchFolder);
      })
      .on('add', async (path) => {
        try {
          await watchAddHandler(path, configData);
        } catch (error) {
          logger.error('Error processing file:', error);
        }
      })
      .on('error', (error) => {
        logger.error('Watcher error: ', error);
        reject(error);
      });
  });
}

module.exports = startWatching;
