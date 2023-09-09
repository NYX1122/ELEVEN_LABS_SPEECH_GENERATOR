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
      console.log(currentPrompt.text);
      rl.close();
      wishContinue(prompts, index + 1).then(resolve);
    } else {
      console.log(currentPrompt.text);
      rl.question('', (answer) => {
        rl.close();
        if (answer.trim().toLowerCase() === 'y') {
          console.log('Proceeding...');
          wishContinue(prompts, index + 1).then(resolve);
        } else {
          console.log('Closing application...');
          process.exit();
        }
      });
    }
  });
}

module.exports = wishContinue;
