/**
 * Get all options (global & local)
 */
function getOptions(command, program) {
  const globalOptions = program.opts();
  const commandOptions = command.opts();
  return {...globalOptions, ...commandOptions};
}

module.exports = {
  getOptions: getOptions,
}
