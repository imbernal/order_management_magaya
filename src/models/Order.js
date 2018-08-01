const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    number: Number,
    date: { type: Date , default: Date.now },
    shipping_address: {
        street: String,
        number: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    payment_type: String,
    total: Number
});

module.exports = mongoose.model('Order' , OrderSchema);