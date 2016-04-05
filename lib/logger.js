'use strict';

var bunyan = require('bunyan');
var _logLevels = ['info', 'debug', 'warn', 'error', 'fatal'];
var _modUtils = require('./modUtils');
var _logStreams = require('./log-streams');

var serializers = {
  req: bunyan.stdSerializers.req, // standard bunyan req serializer
  err: bunyan.stdSerializers.err // standard bunyan error serializer
};


function createLogger(options) {
  options = options || {};
  var levels = _logLevels.concat(options.logLevels || []);
  options.pid = _modUtils.getPID();
  var logger = bunyan.createLogger({
    name: (options.name || '_unknown') + _modUtils.getPID(),
    levels: levels,
    serializers: serializers,
    streams: _logStreams(options)
  });
  return logger;
}

module.exports = function logger(options) {

  return createLogger(options);
};
