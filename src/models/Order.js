const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderNumber = require("shortid");

const OrderSchema = new Schema({
  number: { type: String, default: orderNumber.generate, unique: true },
  date: { type: Date, default: Date.now },
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
  customer: { type: Schema.ObjectId, ref: "CutomerSchema" },
  products: [{ type: Schema.ObjectId, ref: "ProductSchema", require: true }]
});

module.exports = mongoose.model("Order", OrderSchema);
