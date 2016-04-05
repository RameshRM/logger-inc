// 'use strict';
// var bunyan = require('bunyan');
// var fs = require('fs');
// var logFile = fs.createWriteStream('../error.log');
// var instanceId = process.env.NODE_APP_INSTANCE;
//
// module.exports = function () {
//
// };
// var EventEmitter = require('events').EventEmitter;
// var util = require('util');
//
// function MyFlakyStream() {
//
// }
//
// util.inherits(MyFlakyStream, EventEmitter);
//
// MyFlakyStream.prototype.write = function (rec) {
//   // console.log(rec);
//   // logFile.pipe(rec);
//   // rec.pipe(logFile);
//   // this.emit('error', new Error('boom'));
// }
// var _stream = new MyFlakyStream();
//
// _stream.on('error', function onError(err) {
//   console.log(err);
// });
// var logger = bunyan.createLogger({
//   name: "DemoLogger" + parseInt(instanceId, 10), // logger name
//   levels: ['info', 'debug', 'warn', 'error', 'fatal'],
//   serializers: {
//     req: bunyan.stdSerializers.req, // standard bunyan req serializer
//     err: bunyan.stdSerializers.err // standard bunyan error serializer
//   },
//   streams: [{
//     level: 'debug',
//     stream: process.stdout
//   }, {
//     level: 'error',
//     path: './error' + parseInt(instanceId, 10) + '.log'
//   }, {
//     level: 'info',
//     path: './info.log'
//   }, {
//     type: 'raw',
//     stream: _stream,
//     reemitErrorEvents: true
//   }]
//
// });
//
//
// logger.info({
//   message: 'Hello'
// });
// logger.error({
//   err: 'Unknwon'
// });
// logger.on('err', function err(err) {
//   console.log(err);
// });
// logger.debug('Do some');
// // logger.log('New Log');
//
// function Wuzzle(options) {
//   this.log = options.log.child({
//     widget_type: 'wuzzle'
//   });
//   this.log.info('creating a wuzzle')
// }
// Wuzzle.prototype.woos = function () {
//   this.log.warn('This wuzzle is woosey.')
// }
//
// logger.info('start');
// var wuzzle = new Wuzzle({
//   log: logger
// });
// wuzzle.woos();
// logger.info('done');
//
//
// //
// //
// // var EventEmitter = require('events').EventEmitter;
// // var util = require('util');
// //
// // function MyFlakyStream() {}
// // util.inherits(MyFlakyStream, EventEmitter);
// //
// // MyFlakyStream.prototype.write = function (rec) {
// //   this.emit('error', new Error('boom'));
// // }
// // var flakyStream = new MyFlakyStream();
// //
// // flakyStream.on('error', function (err) {
// //   console.log('Errored');
// // });
// //
// //
// //
// // var log = bunyan.createLogger({
// //   name: 'this-is-flaky',
// //   streams: [{
// //     type: 'raw',
// //     stream: flakyStream,
// //     reemitErrorEvents: true
// //   }]
// // });
// //
// // log.info('hi there');
