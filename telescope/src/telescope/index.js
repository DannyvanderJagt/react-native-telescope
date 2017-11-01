
// var _oldXHR = XMLHTTPRequest;
// require('react-native');
// XMLHTTPRequest = _oldXHR;
import axios from 'axios'
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const url = 'https://jsonplaceholder.typicode.com/users'


    axios.request(url)
    .then((response) => {
      const startTime = Date.now()
      console.log(response)
      response.data.map(item => addToStore(item))
      console.log(Object.keys(store).length)
      console.log(Date.now() - startTime)
    })


const store = {}

const schema = {
  id: Number,
  title: String,
  user: Number,

  lastUpdated: Date,
}

const apiToSchema = [
  { 
    apiKey: 'userId',
    schemaKey: 'user',
  }
]

function addToStore(item){
  const { id } = item
  store[id] = mapToSchema(item)
  store[id] = item
  return store
}


function mapToSchema(item){
  // const changedKeys = Object.keys(apiToSchema)
  
  apiToSchema.map(({ apiKey, schemaKey }) => {
    console.log('change', apiKey, schemaKey)
    item[schemaKey] = item[apiKey]
    delete item[apiKey]
  })

  return item
}