'use strict';

var _ApiScheduler = require('./ApiScheduler');

var _ApiScheduler2 = _interopRequireDefault(_ApiScheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scheduler = new _ApiScheduler2.default();

for (var i = 0; i < 100; i++) {
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 2
  });
  // .on({
  //   success:
  //   error:

  //   status: {
  //     '4xx': // All 400 statuses
  //     '5xx': // All 
  //     [400, 402, 404]: // 400, 402, 404 status
  //     200: // (success)

  //   }
  // })
}

for (var _i = 0; _i < 100; _i++) {
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 0
  });
}

setTimeout(function () {
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 0
  });
}, 3000);

scheduler.start();
// console.log(scheduler.queue)