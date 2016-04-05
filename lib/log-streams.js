'use strict';

var Path = require('path');
var Hoek = require('hoek');
var fs = require('fs');


var instanceId = process.env.NODE_APP_INSTANCE;
var devStreams = [{
  level: 'debug',
  stream: process.stdout
}, {
  level: 'error',
  stream: process.stdout
}, {
  level: 'info',
  stream: process.stdout
}, {
  level: 'fatal',
  stream: process.stdout
}];


var _logBaseDir = Path.join(process.cwd(), '/logs');
var _setupLogFn = Hoek.once(setupLogFn, _logBaseDir);
setupLogFn(_logBaseDir);

function setupLogFn(baseDir) {
  setImmediate(function () {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
  });
}

function getStreams(options) {

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return devStreams;
  }

  options = options || {};

  var pid = options.pid || 0;
  var cwdLogs = Path.join(process.cwd(), '/logs');
  var logsDir = options.baseDir || _logBaseDir;
  var errorFile = Path.join(logsDir, 'error' + pid + '.log');
  var infoFile = Path.join(logsDir, 'info' + pid + '.log');
  var period = options.period || '1d';
  var streams = [{
    type: 'rotating-file',
    level: 'error',
    path: errorFile,
    period: period
  }, {
    type: 'rotating-file',
    level: 'info',
    path: infoFile,
    period: period
  }];
  return streams.concat(options.streams || []);
}

module.exports = function streams(options) {
  return getStreams(options);
};
