import ApiScheduler from './ApiScheduler'

const scheduler = new ApiScheduler()

for(let i = 0; i < 100; i++){
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 2,
  })
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

for(let i = 0; i < 100; i++){
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 0,
  })
}

setTimeout(() => {
  scheduler.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'get',
    retry: 200,
    timeout: 2000,
    prio: 0,
  })
}, 3000)

scheduler.start()
// console.log(scheduler.queue)