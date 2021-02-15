const path = require('path');
const chalk = require('chalk');

/**
 * Get output JSON to use with compilation
 */
function getOutputJson(options, inkfile) {
  let outputJson;
  if (typeof options.output === 'undefined') {
      outputJson = path.join(path.dirname(inkfile.pathfile), inkfile.storyName + '.json');
      console.debug('No output options given, use default: ' + chalk.yellow(outputJson));
  } else {
      outputJson = path.resolve(options.output);
  }
  return outputJson;
}

module.exports = {
  getOutputJson: getOutputJson,
}
