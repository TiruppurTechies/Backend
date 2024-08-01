const mongoose = require('mongoose');
const { PAYMENT_METHOD } = require('../constants');
const { required } = require('joi');

const orderSchema = new mongoose.Schema({
  userTag: {
    type: String,
    required: true,
  },
  items: [
    {
      foodName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      qtyprice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderedAt: {
    type: Date,
    required: true,
  },
  paymentMethods:{
    type:String,
    enum:PAYMENT_METHOD,
    required: true
  }
});

const OrderModel = mongoose.model('OrderItem', orderSchema);

module.exports = OrderModel;
