const fs = require('fs');
const md5 = require('md5');
const EOL = require('os').EOL;

const { executeCompilation } = require('./execute-compilation'); 

/**
 * Watch changements in ink story file for launch compilation each times
 */
function watchInkfile(datas, program) {
  let pathinkfile = datas.inkfile.pathfile;
  let fsWait = false;
  let md5Previous = null;
  fs.watch(pathinkfile, (event, filename) => {
      if (filename) {
          if (fsWait) return;
          fsWait = setTimeout(() => {
              fsWait = false;
          }, 100);

          const md5Current = md5(fs.readFileSync(pathinkfile));
          if (md5Current === md5Previous) {
              return;
          }
          md5Previous = md5Current;
          console.log(EOL + `=== Detecting changement in Ink file "${filename}" ===`);
          executeCompilation(datas, program);
      }
  });
}

module.exports = {
    watchInkfile: watchInkfile,
}
