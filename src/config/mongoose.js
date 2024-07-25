// config/mongoose.js

const dotenv = require('dotenv')
dotenv.config()

const config = {
    hostname: process.env.HOST || 'localhost',
    port: process.env.PORT || 5000,
    mongoDbUri:
        process.env.MONGODB_URI || 'mongodb://localhost:27017/TiruppurTechies',
}

module.exports = config
