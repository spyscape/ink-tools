const path = require('path');
const os = require('os');

/**
 * Get path to inklecate depends on os platform
 */
function getInklecateBin() {
  const platform = os.platform();
  let inklecateBin = null;
  let inklecateFolder = path.join(__dirname, '..', '..', 'bin', 'inklecate');
  if (platform === 'win32') {
      inklecateBin = 'inklecate_win.exe';
  } else if (platform === 'linux') {
      inklecateBin = 'inklecate_linux';
  } else if (platform === 'darwin') {
      inklecateBin = 'inklecate_mac';
  } else {
      throw new Error('Unable to find os.platform !');
  }

  return path.resolve(path.join(inklecateFolder, inklecateBin));
}

module.exports = {
  getInklecateBin: getInklecateBin,
}
