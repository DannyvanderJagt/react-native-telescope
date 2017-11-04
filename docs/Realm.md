# Realm

## Example in React
```js

class MyPostsListView extends Component {

  query = {
    schema: 'Post',
    filter: '',
    sort: 'dataAdded' // Ascending / Descending
    limit: 20,
  }

  onSearch(query, ascending = true){
    // Search through all the data and get an array as a result
    this.setQuery({
      filter: `name=${query}`,
      sort: {
        ascending,
      }
    })
  },

  onOpenPost(id){
    // Get only 1 item by id, as an object.
    // Get multiple items by ids, id: [id1, id2, id3, id4]
    this.setQuery({
      id,
    })
  },

  getDataWithApiCall(query, ascending = true){
    this.setQuery({
      api: true, // do GET api call: 1 item, getBatch, search
      filter: `name=${query}`,
      sort: {
        ascending,
      }
    })
  },

  updatePost(id, { title, description }){
    this.updateItem({
      id, // required,
      data: {
        title, description,
      }
    })

    // Or update multiple items all at once
    this.updateItem({
      id: [id1, id2, id3, id4], // required
      data: {
        read: true,
      }
    })

    // Do api call
    this.updateItem({
      id, // Required
      api: true, // Do UPDATE api request
      data: {
        title, description,
      }
    })

  },

  deletePost(id){
    this.deleteItem({
      id, // Required,
      api: true, // Do DELETE api call
    })

    this.deleteItem({
      id: [id1, id2, id3], // Required
    })
  },

  makeAvailableOffline(){
    this.setOffline({
      id: [id1, id2, id3, id4],
      // Optional...
      whiteList: ['title', 'description'],
      blackList: ['dateCreated', 'dateUpdated' ]
    })
  }

  render(){
    const { length } = this.props.query
    return (
      <View>
        <Text>We found ${length} results</Text>
        ... List all the results in a fancy way ...
        <Button title='Search' onPress={this.onSearch}/>
        <Button title='Open Post' onPress={this.onOpenPost}/>
      </View>
    )
  }

}

export default telescope(MyListView, {...options})



```
