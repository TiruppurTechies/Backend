const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const config = require('./config/mongoose')
const path = require('path');
const menuItems = require('./routes/menuItems')
const cors = require('cors');




dotenv.config()
const app = express()

app.use(cors());

// Configure mongoose connection pool settings
const mongooseOptions = {
    minPoolSize: 5, // Minimum number of connections in the pool
    maxPoolSize: 10, // Maximum number of connections in the pool
    connectTimeoutMS: 10000, // Connection timeout
    serverSelectionTimeoutMS: 5000, // Server selection timeout
    socketTimeoutMS: 45000, // Socket timeout
    // TBD: ssl options for security
}

mongoose.connect(config.mongoDbUri,mongooseOptions)
const db = mongoose.connection
db.on('error', (err) => {
    console.error('Connection error:', err)
})
db.once('open', () => {
    console.log('Successfully connected to MongoDB')
})


/** Parse the body of the request */
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/menuItems',menuItems)


app.get('/', (req, res) => {
    res.status(200).send('Tiruppur Techies!\n')
})


app.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}`)
})

app.use(express.json())