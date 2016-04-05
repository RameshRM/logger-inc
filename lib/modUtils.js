'use strict';
var _appInstance = process.env.NODE_APP_INSTANCE;

module.exports.getPID = function getPID() {
  return tryGetPID(_appInstance);
};

function tryGetPID(_appInstance) {
  try {
    return _appInstance && parseInt(_appInstance, 10) || 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
