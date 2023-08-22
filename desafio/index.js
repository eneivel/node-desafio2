require( 'dotenv' ).config()
const express = require( 'express' )
const app = express()
const fs = require( 'fs' )
const cors = require( 'cors' )

const port = process.env.PORT || 3000
app.listen( port, console.log( `Servidor encendido en: http://localhost:${ port }` ) )

app.use( express.json() )
app.use( cors() )


app.get( "/", ( req, res ) => {
  res.sendFile( __dirname + "/index.html" )
} )

app.post( "/canciones", ( req, res ) => {
  const song = req.body
  const songs = JSON.parse( fs.readFileSync( 'repertorio.json' ) )
  songs.push( song )
  fs.writeFileSync( 'repertorio.json', JSON.stringify( songs ) )
  res.status( 201 ).send( 'Canción agregada exitósamente' )
} )

app.get( "/canciones", ( req, res ) => {
  const songs = JSON.parse( fs.readFileSync( 'repertorio.json' ) )
  res.status( 200 ).json( songs )
} )

app.put( "/canciones/:id", ( req, res ) => {
  const { id } = req.params
  const song = req.body
  const songs = JSON.parse( fs.readFileSync( 'repertorio.json' ) )
  const index = songs.findIndex( p => p.id == id )
  songs[ index ] = song
  fs.writeFileSync( 'repertorio.json', JSON.stringify( songs ) )
  res.status( 200 ).send( 'Canción modificada con éxito' )
} )

app.delete( "/canciones/:id", ( req, res ) => {
  const { id } = req.params
  const songs = JSON.parse( fs.readFileSync( 'repertorio.json' ) )
  const index = songs.findIndex( p => p.id == id )
  songs.splice( index, 1 )
  fs.writeFileSync( 'repertorio.json', JSON.stringify( songs ) )
  res.status( 200 ).send( "Canción eliminada con éxito" )
} )

// Esta ruta es solo para efectos de practica y no esta siendo utilizada en el proyecto
app.get( "/canciones/:id", ( req, res ) => {
  const { id } = req.params
  const songs = JSON.parse( fs.readFileSync( 'repertorio.json' ) )
  const song = songs.find( p => p.id == id )
  res.status( 200 ).json( song )
} )
