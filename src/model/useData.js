const mongoose = require('mongoose')
const {generateCustomIDs,connectToMongoDB} = require('./utils/customIdGenerator')

const userDataSchema = new mongoose.Schema({
    userName:String,
    mobile:String,
    password:String,
    confirmPassword:String,
    createdAt:{type:Date,default:Date.now},
    userTag:{type:String,unique:true}
})

userDataSchema.pre('save', async function (next) {
    if (!this.userTag) {
        const prefix = 'USER'
        const seqFieldName = 'userId'

        try {
            const customIDs = await generateCustomIDs(
                prefix,
                'user',
                seqFieldName
            )
            this.userTag = customIDs.customIDReference
            this.userId = customIDs.customIDNumber
        } catch (error) {
            console.error('Error generating custom IDs:', error)
            throw error
        }
    }

    next()
})

const UserDataModel = mongoose.model('UserData',userDataSchema)

module.exports = UserDataModel