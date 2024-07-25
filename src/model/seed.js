const mongoose =require('mongoose')

const menuItemSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    veg: { type: Boolean, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema)
module.exports = MenuItem
