const express = require('express')
const express_graphql = require('express-graphql')
const {buildSchema} = require('graphql')

//schema
const schema = buildSchema(`
 type Query{
    album(id: Int!): Album
    albums(genre: String): [Album]
 }
 
 type Mutation {
    createAlbum(id: Int!, title: String!, artist: String!, releaseYear: Int!, genre: String!): Album
    updateAlbumTitle(id: Int!, title: String!): Album
    deleteAlbum(id: Int!): Album
 }
 
 type Album{
    id: Int
    title: String
    artist: String
    releaseYear: Int
    genre: String
 }
`);

let data = [
    {
        id: 1,
        title: 'Killers',
        artist: 'Iron Maiden',
        releaseYear: 1981,
        genre: 'Metal'
    },

    {
        id: 2,
        title: 'Ride the lightning',
        artist: 'Metallica',
        releaseYear: 1984,
        genre: 'Metal'
    },

    {
        id: 3,
        title: 'Moving Pictures',
        artist: 'Rush',
        releaseYear: 1981,
        genre: 'Rock'
    }
]

const getAlbum = async (args) => {
    return data.find(album => {
        return album.id === args.id;
    })
}

const getAlbums = async (args) => {
    if (args.genre) return data.filter(albums => albums.genre === args.genre);
}

const updateAlbumTitle = async ({id, title}) => {
    data.map(album => {
        if (album.id === id) {
            album.title = title;
            return album;
        }
    });
    return data.find(album => {
        return album.id === id;
    })
}

const createAlbum = async ({id, title, artist, releaseYear, genre}) => {
    data.push({id: id,title: title, artist: artist, releaseYear: releaseYear, genre:  genre});
}

const deleteAlbum = async (args) => {
    data = data.filter(album => album.id !== args.id);
}

//resolvers
const root = {
    album: getAlbum,
    albums: getAlbums,
    createAlbum: createAlbum,
    updateAlbumTitle: updateAlbumTitle,
    deleteAlbum: deleteAlbum
}

//server
const app = express()
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use('/', async (req, res ,next) => {
    res.send({message: 'goto /graphql to write a query'})
});

app.listen(3000, () => console.log('server running on port 3000 http://localhost:3000/graphql'))
