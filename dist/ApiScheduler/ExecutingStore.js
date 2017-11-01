'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExecutingStore = function () {
  function ExecutingStore(options) {
    _classCallCheck(this, ExecutingStore);

    this.options = {
      limit: 5
    };
    this.store = {};
    this.availablePositions = [];

    this.options = {
      limit: options.limit || this.options.limit
    };

    console.log('[ExecutingStore]', options, this.options);

    // Prepopulate store
    var i = 0;
    for (i; i < this.options.limit; i++) {
      this.store[i] = undefined;
      this.availablePositions.push(i);
    }
  }

  _createClass(ExecutingStore, [{
    key: 'add',
    value: function add(request) {
      if (this.availablePositions.length === 0) {
        console.log('[ExecutingStore] No available positions');
        return false;
      }

      var position = this.availablePositions.shift();
      this.store[position] = request;

      return position;
    }
  }, {
    key: 'remove',
    value: function remove(position) {
      if (position < this.options.limit) {
        console.log('[ExecutingStore] Position is not within limit range');
        return false;
      }

      delete this.store[position];
      this.store[position] = undefined;

      this.availablePositions.push(position);

      return true;
    }
  }, {
    key: 'getOccupiedAmount',
    value: function getOccupiedAmount() {
      return this.options.limit - this.availablePositions.length;
    }
  }]);

  return ExecutingStore;
}();

exports.default = ExecutingStore;