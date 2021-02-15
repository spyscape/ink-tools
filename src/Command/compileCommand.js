/*
 * @copyright 6i (2020)
 * @author 20100 <vb20100bv@gmail.com>
 * Released under a MIT license.
 */

'use strict';

const chalk = require('chalk');
const EOL = require('os').EOL;

const { checkInkfile } = require('./check-ink-file');
const { getInklecateBin } = require('./get-inklecate-bin');
const { getOptions } = require('./get-options');
const { getOutputJson } = require('./get-output-json');
const { executeCompilation } = require('./execute-compilation');
const { watchInkfile } = require('./watch-ink-file');

function run(inkfile, command, program) {
    const options = getOptions(command, program);
    if (!options.watch) {
        console.log(EOL + '=== Start compilation ===')
    } else {
        console.log(EOL + '=== Start watching ink file ===')
    }

    let datas = {}
    datas.inklecateBin = getInklecateBin();
    datas.inkfile = checkInkfile(inkfile, program);
    datas.outputJson = getOutputJson(options, datas.inkfile);

    console.info('Ink name file: ' + chalk.yellow(datas.inkfile.fileName));
    console.info('Ink path file: ' + chalk.yellow(datas.inkfile.pathfile));
    console.info('Output JSON: ' + chalk.yellow(datas.outputJson));
    console.info('Inklecate bin: ' + chalk.yellow(datas.inklecateBin));

    if (!options.watch) {
        executeCompilation(datas, program, () => {
            program._exit(0, 'commander.compilCommand.inklecate', 'Inklecate compilation successful!');
        });
    } else {
        executeCompilation(datas);
        watchInkfile(datas, program);
    }
}

/**
 * Add compile command into CLI application
 *
 * @param program see Caporal.js
 */
function add(program) {

    // Add compile command into program
    program
        .command('compile <inkFile>')
        .option('-o, --output <jsonFile>', 'Set output JSON file.')
        .option('-w, --watch', 'Enable watch mode, to detect if ink file has changed.')
        .description('Compile story Ink file into JSON.')
        .action((inkfile, command) => run(inkfile, command, program));
}

module.exports = {
    add
};
