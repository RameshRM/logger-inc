'use strict';

var bunyan = require('bunyan');
var Path = require('path');
var logger = require('./logger');

module.exports.create = logger.bind();
