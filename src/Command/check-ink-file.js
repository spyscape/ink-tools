const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Resolve inkfile and check if exists
 */
function checkInkfile(inkfile, program) {
  let pathfile = path.resolve(inkfile);
  if (fs.existsSync(pathfile)) {
      if (path.extname(pathfile) !== '.ink') {
          let msg = 'The given Inkfile must have *.ink extension: ' + chalk.yellow(pathfile);
          console.error(msg);
          program._exit(1, 'commander.compilCommand.inkfile', msg);
      }

      console.debug('The given Inkfile exists and available: ' + chalk.yellow(pathfile));
      return {
          pathfile: pathfile,
          fileName: path.basename(pathfile),
          storyName: path.basename(pathfile).split('.').slice(0, -1).join('.')
      }
  } else {
      let msg = 'Unable to find the given Inkfile: ' + chalk.yellow(pathfile);
      console.error(msg);
      program._exit(1, 'commander.compilCommand.inkfile', msg);
  }
}

module.exports = {
  checkInkfile: checkInkfile,
}
