const chalk = require('chalk');

function consoleStyleThemes() {
  const loggers = {
    error: (message, errorObj) => {
      if (errorObj instanceof Error) {
        console.error(
          chalk.red(message),
          chalk.red(errorObj.message),
          chalk.red(errorObj.stack)
        );
      } else {
        console.error(chalk.red(message), chalk.red(errorObj));
      }
    },
    success: (message) => console.log(chalk.green(message)),
    initialize: (message) => console.log(chalk.blue(message)),
    output: (message) => console.log(chalk.magenta(message)),
    prompt: (message) => console.log(chalk.bgYellow(message)),
  };

  return loggers;
}

const loggers = consoleStyleThemes();

module.exports = loggers;
