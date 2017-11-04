import axios from 'axios'
import statusToString from './statusToString'

export default class Request {
  options = {
    prio: 2, // default: normal
    timeout: 200,
    retry: 4,
    status: 0,
    executingPosition: undefined,
  }

  history = []

  constructor(params = {}){
    this.options = {
      ...this.options,
      ...params
    }
  }

  execute(fn){
    this.callback = fn
    this.setStatus(1)
    // Executing request
    console.log('executing request with prio', this.options.prio)

    axios
      .request({
        url: this.options.url,
        method: this.options.method,
      })
      .then(this._onExecuteSuccess)
      .catch(this._onExecuteError)
  }

  _onExecuteSuccess = () => {
    // console.log('success')
    this.callback()
  }

  _onExecuteError = (err) => {
    console.log('error', err)
  }

  setStatus(status){
    this.options.status = status
    this.history.push({
      status: statusToString[status],
      timestamp: Date.now(),
    })

    return this
  }

  getPrio(){
    return this.options.prio
  }

  setExecutingPosition(position){
    this.options.executingPosition = position
    return this
  }

  getExecutingPosition(){
    return this.options.executingPosition
  }

  



}