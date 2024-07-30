// server.js
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const config = require('./config/mongoose')
const path = require('path')
const cors = require('cors')


const { STATUS_CODES } = require('./constants')

const menuItems = require('./routes/menuItems')
const userData = require('./routes/userData')

dotenv.config()
const app = express();

// Configure mongoose connection pool settings
const mongooseOptions = {
    minPoolSize: 5, // Minimum number of connections in the pool
    maxPoolSize: 10, // Maximum number of connections in the pool
    connectTimeoutMS: 10000, // Connection timeout
    serverSelectionTimeoutMS: 5000, // Server selection timeout
    socketTimeoutMS: 45000, // Socket timeout
    // TBD: ssl options for security
}

mongoose.connect(config.mongoDbUri, mongooseOptions)
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

//Health Check Route
app.get('/', (req, res) => {
    res.status(STATUS_CODES.OK).send('Hello World!\n')
})


/** Routes go here */
app.use('/menuItems',menuItems)
app.use('/userData',userData)
/** Error handling */
app.use((req, res) => {
    const error = new Error('URL Not found')
    res.status(STATUS_CODES.NOT_FOUND).json({
        message: error.message,
    })
})

app.listen(config.port, config.hostname, () => {
    console.log(
        `Server is listening on http://${config.hostname}:${config.port}`
    )
})

app.use(express.json())
app.use(cors())
