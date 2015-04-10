'use strict';

var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var child_process = require('child_process');

// request.debug = true;

// config
var copied_template = '- [%s](%s)';

module.exports = function(url) {
    request({
        url: url,
        headers: {
            "User-Agent": "Titler/0.0.2"
            // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36"
        }
    }, function(err, res, body) {
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
            console.log(err);
            console.log('URL request failed.');
        }
    });
};
