const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const ProductSchema = new Schema({
    id: { type: String , unique: true },
    description: String,
    price: Number,
    weight: Number,
    order: { type: Schema.ObjectId , ref: 'OrderSchema' }
});

module.exports = mongoose.model('Product' , ProductSchema);