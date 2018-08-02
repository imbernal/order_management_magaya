const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productId = require("shortid");

const ProductSchema = new Schema({
  id: { type: String, default: productId.generate, unique: true },
  description: String,
  price: Number,
  weight: Number,
  isInOrder: { type: Number, default: 0 },
  order: { type: Schema.ObjectId, ref: "OrderSchema" }
});

module.exports = mongoose.model("Product", ProductSchema);
