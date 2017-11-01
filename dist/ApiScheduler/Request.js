'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _statusToString = require('./statusToString');

var _statusToString2 = _interopRequireDefault(_statusToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
  function Request() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Request);

    this.options = {
      prio: 2, // default: normal
      timeout: 200,
      retry: 4,
      status: 0,
      executingPosition: undefined
    };
    this.history = [];

    this._onExecuteSuccess = function () {
      // console.log('success')
      _this.callback();
    };

    this._onExecuteError = function (err) {
      console.log('error', err);
    };

    this.options = _extends({}, this.options, params);
  }

  _createClass(Request, [{
    key: 'execute',
    value: function execute(fn) {
      this.callback = fn;
      this.setStatus(1);
      // Executing request
      console.log('executing request with prio', this.options.prio);

      _axios2.default.request({
        url: this.options.url,
        method: this.options.method
      }).then(this._onExecuteSuccess).catch(this._onExecuteError);
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.options.status = status;
      this.history.push({
        status: _statusToString2.default[status],
        timestamp: Date.now()
      });

      return this;
    }
  }, {
    key: 'getPrio',
    value: function getPrio() {
      return this.options.prio;
    }
  }, {
    key: 'setExecutingPosition',
    value: function setExecutingPosition(position) {
      this.options.executingPosition = position;
      return this;
    }
  }, {
    key: 'getExecutingPosition',
    value: function getExecutingPosition() {
      return this.options.executingPosition;
    }
  }]);

  return Request;
}();

exports.default = Request;