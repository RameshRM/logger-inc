'use strict';

var request = require('supertest');
var assert = require('assert');
var logger;
var cwd = process.cwd();
var fs = require('fs');
var path = require('path');
var pid = require('../lib/modUtils').getPID();
var _stdout = console.log;
var _logmsgs = [];
var stdWrite = process.stdout.write;

describe(__filename + 'start server', function () {

  before(function (done) {
    process.chdir(__dirname);
    logger = require('../');
    process.env.NODE_ENV = 'development';
    done();
  });

  after(function (done) {
    delete process.env.NODE_ENV;
    process.chdir(cwd);

    done();
  });

  it(__filename + 'should write to stdout log', function (done) {
    assert.ok(logger);
    var now = Date.now();
    var log = logger.create({});
    log.info('Hello World_' + now);
    done();
  });

});

function check(msg) {
  return _logmsgs.indexOf(msg) > -1;
}
