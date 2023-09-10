require('dotenv').config();
require('module-alias/register');
const loggers = require('loggers');
const configData = require('configData');

loggers.initialize('Running application...');

async function initializeApp() {
  try {
    await require('setupModuleAliases')();

    const startWatching = require('startWatching');

    startWatching(configData);
  } catch (error) {
    loggers.error('Error:', error);
    throw error;
  }
}

initializeApp();
