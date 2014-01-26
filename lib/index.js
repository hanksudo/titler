'use strict';

var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var child_process = require('child_process');

// config
var copied_template = '- [%s](%s)';

module.exports = function(url) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            var $ = cheerio.load(body);
            var result = util.format(copied_template, $('title').text(), url);
            child_process.exec('echo "' + result + '" | pbcopy', function(err, stdout, stderr) {
                if (stderr) {
                    console.log(stderr);
                } else {
                    console.log('title: ' + $('title').text());
                    console.log('url: ' + url);
                    console.log('Copied to clipboard.');
                }
            });
        } else {
            console.log('URL request failed.');
        }
    });
};
