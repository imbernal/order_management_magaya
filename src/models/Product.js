const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const ProductSchema = new Schema({
    id: { type: String , default: 1 },
    description: String,
    price: Number,
    weight: Number,
    order: { type: Schema.ObjectId , ref: 'OrderSchema' }
});

module.exports = mongoose.model('Product' , ProductSchema);