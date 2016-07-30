#!/usr/bin/env node
'use strict';

var path = require('path');
var cli = require('commander');
var titler = require('./');
var pkg = require(path.join(__dirname, '../package.json'));

cli
    .usage('[url]')
    .version(pkg.version);

cli.on('--help', function() {
    console.log('  Usage:');
    console.log('');
    console.log('    $ titler http://github.com');
    console.log('    $ titler cnn.com');
    console.log('');
});

cli
   .command('*')
   .description(pkg.description)
   .action(function(url) {
        cli.url = url;
    });

cli.parse(process.argv);

if (!cli.url) {
    cli.help();
}

titler(cli.url);
