import axios from 'axios'
import lodash from 'util'

import Request from './Request'
import ExecutingStore from './ExecutingStore'

export default class Scheduler {
  options = {
    limit: 50,

    retry: 4,
    timeout: 400,

    priority: {
      important: {
        retry: 2,
        timeout: 200,
      },
    }
  }

  executing = new ExecutingStore({ limit: this.options.limit })

  queue = [
    [], // Important / VIR (Very Important Request :P )
    [], // Prio
    [], // Normal
    [], // When you have time
    [], // Background
  ]

  start(){
    const { limit } = this.options
    const queueLength = this.getQueueLength()

    if(queueLength === 0){ return }
    if(this.executing.length >= this.options){ return }

    // Start the right number of requests
    let i = 0
    let length = limit - this.executing.getOccupiedAmount()

    if(length > queueLength){
      length = queueLength
    }

    for(i; i < length; i++){
      this._executeNextRequest()
    }
  }

  getQueueLength(){
    let queueLength = 0
      
    let i = 0
    const length = this.queue.length
    for(i; i < length; i++){
      queueLength += this.queue[i].length
    }

    return queueLength
  }

  getConfigForPrio(_prio){
    const options = this.options
    const prio = _prio === undefined ? 2 : _prio

    const prioConfig = options.priority[prio] || {}

    return {
      prio,
      retry: prioConfig.retry || options.retry,
      timeout: prioConfig.timeout || options.timeout 
    }
  }

  getNextRequestInLine(){
    // Important first...
    for(let i = 0; i < this.queue.length; i++){
      if(this.queue[i].length > 0){
        return this.queue[i].shift()
      }
    }
  }

  /**
   * User wants to do a new request
   */
  request = (_params) => {
    let params

    if(typeof params === 'string'){
      params = { url: params }
    }else{
      // We don't want to modify any user input directly
      params = {..._params}
    }

    // Prepare params...
    const config = this.getConfigForPrio(params.prio)

    params = {
      ...params,
      prio: config.prio,
      timeout: params.timeout || config.timeout,
      retry: params.retry || config.retry,
    }

    // Prepare request
    const request = new Request(params)

    this.queue[config.prio].push(request)

    request.setStatus(0)

    // Check to start the executing...
    // this.start()
  }

  _executeNextRequest(){
    const { limit } = this.options
    const currentlyExecuting = this.executing.length
    // Return back to waiting...
    if(currentlyExecuting > limit){ return }

    const request = this.getNextRequestInLine()

    // Move request to the executing line
    const position = this.executing.add(request)
    request.setExecutingPosition(position)
    request
      .execute(() => {
        const position = request.getExecutingPosition()
        this.executing.remove()
        this.start()
      })
  }
}