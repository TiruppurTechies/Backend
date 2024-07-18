const express = require('express')
const dotenv = require('dotenv')

const mongoose = require('mongoose')
const config = require('./config/mongoose')

dotenv.config()
const app = express()

const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || 5000


mongoose.connect(config.mongoDbUri)
const db = mongoose.connection
db.on('error', (err) => {
    console.error('Connection error:', err)
})
db.once('open', () => {
    console.log('Successfully connected to MongoDB')
})

app.get('/', (req, res) => {
    res.status(200).send('Tiruppur Techies!\n')
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})