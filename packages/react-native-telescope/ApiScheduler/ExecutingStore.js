export default class ExecutingStore {
  options = {
    limit: 5,
  }

  store = {}
  availablePositions = []

  constructor(options){
    this.options = {
      limit: options.limit || this.options.limit,
    }

    console.log('[ExecutingStore]', options, this.options)

    // Prepopulate store
    let i = 0
    for(i; i < this.options.limit; i++){
      this.store[i] = undefined
      this.availablePositions.push(i)
    }
  }

  add(request){
    if(this.availablePositions.length === 0){
      console.log('[ExecutingStore] No available positions')
      return false 
    }

    const position = this.availablePositions.shift()
    this.store[position] = request

    return position
  }

  remove(position){
    if(position < this.options.limit){
      console.log('[ExecutingStore] Position is not within limit range')
      return false
    }
    
    delete this.store[position]
    this.store[position] = undefined

    this.availablePositions.push(position)

    return true
  }

  getOccupiedAmount(){
    return this.options.limit - this.availablePositions.length
  }
}