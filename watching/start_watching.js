const chokidar = require('chokidar');
const editTextFile = require('./editing/edit_text_file');
const generationIterator = require('./iterating/generation_iterator');

function startWatching(configData) {
  console.log('Initializing watcher...');
  console.log('Path to watch: ', configData.pathToWatch);
  const watcher = chokidar.watch('../reception', {
    ignored: /(^|[\/\\])\../,
  });

  watcher
    .on('ready', () => {
      console.log('Watcher has been initialized, awaiting .txt files...');
    })
    .on('add', (path) => {
      console.log('File detected!');
      if (path.endsWith('.txt')) {
        console.log('File is .txt, initializing text editor...');

        editTextFile(path)
          .then((joinedChunkArrays) => {
            return generationIterator(joinedChunkArrays, configData);
          })
          .then((data) => {
            console.log('Audio generated successfully.');
          })
          .catch((error) => {
            console.error('Error processing file: ', error);
          });
      }
    })
    .on('error', (error) => {
      console.error('Watcher error: ', error);
    });
}

module.exports = startWatching;
