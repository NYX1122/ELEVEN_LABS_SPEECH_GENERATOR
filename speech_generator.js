require('dotenv').config();
require('module-alias/register');
const startWatching = require('startWatching');
const setupModuleAliases = require('setupModuleAliases');
const configData = require('configData');

setupModuleAliases()
  .then(() => {
    console.log('Running speech generator...');
    startWatching(configData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
