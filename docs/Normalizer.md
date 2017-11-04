# Normalize

## Example
```js

/**
   Post:

   {
    type: PropertyMap || Object,
    primaryID: 'id',
    trackCreatedTimeStamp: true || false, // Add date of creating to the data
    trackUpdateTimeStamp: true || false, // Add date of last updated to data
    storeOffline: true || false || fn,
    schema: {
      id: Number,
      title: String,
    }
   }

*/

// Pure function
export default (api) => ({
  id: api.key,
  title: safe(api.title) || 'default title',
  description: safe(api.description) || 'default description',
})

```
