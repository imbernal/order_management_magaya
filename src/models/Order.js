const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    number: { type: Number , unique: true },
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
    total: Number,
    customer: { type: Schema.ObjectId , ref: 'CutomerSchema' }
});

module.exports = mongoose.model('Order' , OrderSchema);