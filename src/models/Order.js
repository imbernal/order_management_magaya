const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helpers/unique_values');

const OrderSchema = new Schema({
    number: { type: Number , default: i , unique: true },
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
    customer: { type: Schema.ObjectId , ref: 'CutomerSchema' },
    product: [{ type: Schema.ObjectId , ref: 'ProductSchema' , require: true }]

});

module.exports = mongoose.model('Order' , OrderSchema);