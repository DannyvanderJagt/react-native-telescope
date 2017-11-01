'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _ExecutingStore = require('./ExecutingStore');

var _ExecutingStore2 = _interopRequireDefault(_ExecutingStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scheduler = function () {
  function Scheduler() {
    var _this = this;

    _classCallCheck(this, Scheduler);

    this.options = {
      limit: 50,

      retry: 4,
      timeout: 400,

      priority: {
        important: {
          retry: 2,
          timeout: 200
        }
      }
    };
    this.executing = new _ExecutingStore2.default({ limit: this.options.limit });
    this.queue = [[], // Important / VIR (Very Important Request :P )
    [], // Prio
    [], // Normal
    [], // When you have time
    []];

    this.request = function (_params) {
      var params = void 0;

      if (typeof params === 'string') {
        params = { url: params };
      } else {
        // We don't want to modify any user input directly
        params = _extends({}, _params);
      }

      // Prepare params...
      var config = _this.getConfigForPrio(params.prio);

      params = _extends({}, params, {
        prio: config.prio,
        timeout: params.timeout || config.timeout,
        retry: params.retry || config.retry

        // Prepare request
      });var request = new _Request2.default(params);

      _this.queue[config.prio].push(request);

      request.setStatus(0);

      // Check to start the executing...
      // this.start()
    };
  }

  _createClass(Scheduler, [{
    key: 'start',
    value: function start() {
      var limit = this.options.limit;

      var queueLength = this.getQueueLength();

      if (queueLength === 0) {
        return;
      }
      if (this.executing.length >= this.options) {
        return;
      }

      // Start the right number of requests
      var i = 0;
      var length = limit - this.executing.getOccupiedAmount();

      if (length > queueLength) {
        length = queueLength;
      }

      for (i; i < length; i++) {
        this._executeNextRequest();
      }
    }
  }, {
    key: 'getQueueLength',
    value: function getQueueLength() {
      var queueLength = 0;

      var i = 0;
      var length = this.queue.length;
      for (i; i < length; i++) {
        queueLength += this.queue[i].length;
      }

      return queueLength;
    }
  }, {
    key: 'getConfigForPrio',
    value: function getConfigForPrio(_prio) {
      var options = this.options;
      var prio = _prio === undefined ? 2 : _prio;

      var prioConfig = options.priority[prio] || {};

      return {
        prio: prio,
        retry: prioConfig.retry || options.retry,
        timeout: prioConfig.timeout || options.timeout
      };
    }
  }, {
    key: 'getNextRequestInLine',
    value: function getNextRequestInLine() {
      // Important first...
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i].length > 0) {
          return this.queue[i].shift();
        }
      }
    }

    /**
     * User wants to do a new request
     */

  }, {
    key: '_executeNextRequest',
    value: function _executeNextRequest() {
      var _this2 = this;

      var limit = this.options.limit;

      var currentlyExecuting = this.executing.length;
      // Return back to waiting...
      if (currentlyExecuting > limit) {
        return;
      }

      var request = this.getNextRequestInLine();

      // Move request to the executing line
      var position = this.executing.add(request);
      request.setExecutingPosition(position);
      request.execute(function () {
        var position = request.getExecutingPosition();
        _this2.executing.remove();
        _this2.start();
      });
    }
  }]);

  return Scheduler;
}();

exports.default = Scheduler;