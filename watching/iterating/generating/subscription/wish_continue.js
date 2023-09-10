const logger = require('loggers');
const readline = require('readline');

function wishContinue(prompts, index = 0) {
  return new Promise((resolve, reject) => {
    if (index >= prompts.length) {
      resolve();
      return;
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const currentPrompt = prompts[index];

    if (!currentPrompt.needsAnswer) {
      logger.prompt(currentPrompt.text);
      rl.close();
      wishContinue(prompts, index + 1).then(resolve);
    } else {
      logger.prompt(currentPrompt.text);
      rl.question('', (answer) => {
        rl.close();
        if (answer.trim().toLowerCase() === 'y') {
          logger.initialize('Proceeding...');
          wishContinue(prompts, index + 1).then(resolve);
        } else {
          logger.initialize('Closing application...');
          process.exit();
        }
      });
    }
  });
}

module.exports = wishContinue;
