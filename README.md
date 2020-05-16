# nodejs-express-graphql
simple crud GraphQl api using array to store data

### npm packages
* express
* express-graphql
* graphql

### usage
```
npm install
```
### Query's
$ are query variables that can be set in the query variable tab.
```JSON
{
  "title": "Title",
  "artist": "Artist"
}
```

###### get album by id
```graphql
query getAlbum($albumId: Int!) {
  album(id: $albumId) {
    artist
    title
    genre
  }
}
```

###### get multiple albums by genre
```graphql
query getAlbums($genre: String!) {
  albums(genre: $genre) {
    artist
  }
}

```
###### new album
```graphql
mutation createAlbum($id: Int!, $title: String!, $artist: String!, $releaseYear: Int!, $genre: String!){
  createAlbum(id: $id, title: $title ,artist: $artist, releaseYear: $releaseYear, genre: $genre ){
  	id
  	title
  	artist
  	releaseYear
    genre
  }
}

```

###### update album title
```graphql
mutation updateAlbumTitle($id: Int!, $title: String!) {
  updateAlbumTitle(id: $id, title: $title) {
    title
  }
}

```

###### delete album
```graphql
mutation deleteAlbum($id: Int!){
  deleteAlbum(id: $id){
  id
  }
}

```
