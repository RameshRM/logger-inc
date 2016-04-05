'use strict';
var request = require('supertest');
var assert = require('assert');
var logger;
var cwd = process.cwd();
var fs = require('fs');
var path = require('path');
var pid = require('../lib/modUtils').getPID();
describe(__filename + 'start server', function () {
  before(function (done) {

    process.chdir(__dirname);
    logger = require('../');
    process.env.NODE_ENV = 'test';

    if (!fs.existsSync('./logs')) {
      return fs.mkdir('./logs', done);
    }
    done();
  });

  after(function (done) {
    fs.readdir('./logs', function logs(err, data) {
      data.forEach(function (curr) {
        fs.unlinkSync('./logs/' + curr);
      });
      process.chdir(cwd);
      delete process.env.NODE_ENV;
      done();
    });
  });

  it(__filename + 'should write to error log', function (done) {
    assert.ok(logger);
    var now = Date.now();
    var log = logger.create({});
    log.error('Hello World_' + now);
    fs.readFile('./logs/error' + pid + '.log', function (err, data) {
      assert.ok(!err);
      assert.ok(data && data.toString().indexOf('Hello World_' + now) > -1);
      done();
    });

  });

  it(__filename + 'Should log message for Application DemoTest & no Debug', function (done) {
    assert.ok(logger);
    var now = Date.now();
    var log = logger.create({
      name: 'DemoTest'
    });
    log.error('Hello World_' + now);
    log.debug('New Debug Message');
    fs.readFile('./logs/error' + pid + '.log', function (err, data) {
      assert.ok(!err);
      assert.ok(data && data.toString().indexOf('Hello World_' + now) > -1);
      assert.ok(data && data.toString().indexOf('New Debug Message') < 0); //Debug Levels are disabled
      assert.ok(data && data.toString().indexOf('"name":"DemoTest0"') > -1);
      assert.ok(data && data.toString().indexOf('"name":"DemoTest0"') > -1);
      done();
    });
  });

  it(__filename + 'Should log message for Application DemoTest & Debug', function (done) {
    assert.ok(logger);
    var now = Date.now();
    var log = logger.create({
      name: 'DemoTest',
      streams: [{
        level: 'debug',
        path: './logs/error1.log'
      }]
    });
    log.error('Hello World_' + now);
    log.debug('New Debug Message');
    fs.readFile('./logs/error' + pid + '.log', function (err, data) {

      assert.ok(!err);
      assert.ok(data && data.toString().indexOf('Hello World_' + now) > -1);

      assert.ok(data && data.toString().indexOf('"name":"DemoTest0"') > -1);
      assert.ok(data && data.toString().indexOf('"name":"DemoTest0"') > -1);
      fs.readFile('./logs/error1.log', function (err, data) {
        assert.ok(data && data.toString().indexOf('New Debug Message') > 0); //Debug Levels are disabled
        done();
      });

    });
  });
});
