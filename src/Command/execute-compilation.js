const shell = require('shelljs');
const EOL = require('os').EOL;

/**
 * Compilation of a story ink file into json with inkelate bin
 */
function executeCompilation(datas, program, cbExit = null) {
  let inklecateCmd = datas.inklecateBin + ' -o ' + datas.outputJson + ' ' + datas.inkfile.pathfile;
  let msg;
  console.info('Ink compilation is starting.');
  shell.exec(inklecateCmd, {silent: true}, function (code, stdout, stderr) {
      if (code !== 0) {
        msg = '[error] Failed inklecate execution.'
            + ((stdout) ? EOL + stdout : '')
            + ((stderr) ? EOL + stderr : '');
        console.error(msg);
        program._exit(1, 'commander.compilCommand.inklecate', msg);
      } else {
        msg = 'Inklecate compilation has finished !';
        console.success(msg);
        if(cbExit !== null) {
            cbExit();
        }
      }
  });
}

module.exports = {
  executeCompilation: executeCompilation,
}
