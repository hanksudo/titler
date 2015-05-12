#!/usr/bin/env node
'use strict';

var path = require('path');
var program = require('commander');
var titler = require('./');
var pkg = require(path.join(__dirname, 'package.json'));

program
    .usage('[url]')
    .version(pkg.version);

program.on('--help', function() {
    console.log('  Usage:');
    console.log('');
    console.log('    $ titler http://github.com');
    console.log('    $ titler cnn.com');
    console.log('');
});

program
   .command('*')
   .description(pkg.description)
   .action(function(url) {
        program.url = url;
    });

program.parse(process.argv);

if (!program.url) {
    program.help();
}

titler(program.url);
