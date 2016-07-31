#!/usr/bin/env node
'use strict';

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var program = require('commander');
var titler = require('./titler');

program
  .version(pkg.version)
  .usage('<url>');

program
  .description(pkg.description)
  .action(function(url) {
    program.url = url;
  }).on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ titler http://github.com');
    console.log('    $ titler cnn.com');
    console.log('');
  })
  .parse(process.argv);

if (!program.url) program.help();

titler(program.url);
