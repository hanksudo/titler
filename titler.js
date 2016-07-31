'use strict';

var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var childProcess = require('child_process');

// request.debug = true;

// config
var copiedTemplate = '- [%s](%s)';

module.exports = function(url) {
  if (!/^https?:\/\//.test(url)) {
    url = 'http://' + url;
  }
  request({
    url: url,
    headers: {
        'User-Agent': 'Titler/0.0.2'
        // 'User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36'
    }
  }, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var _link = res.request.href;

      var $ = cheerio.load(body);
      var title = $('title').text().trim();
      var result = util.format(copiedTemplate, title, _link);
      childProcess.exec('echo "' + result + '" | pbcopy', function(child_err, stdout, stderr) {
        if (stderr) {
          console.log(stderr);
        } else {
          console.log('title: ' + title);
          console.log('url: ' + _link);
          console.log('Copied to clipboard.');
        }
      });
    } else {
      // console.log(err);
      console.log('URL request failed.', _link);
    }
  });
};
