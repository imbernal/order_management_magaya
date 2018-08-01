
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
      
const CustomerSchema = new Schema({
    name: String,
    phone: { type: String , unique: true },
    email: { type: String , unique: true },
    shipping_address: {
        street: String,
        number: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }
});

module.exports = mongoose.model("Customer" , CustomerSchema);
