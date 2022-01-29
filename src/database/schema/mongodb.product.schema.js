const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({            
    time: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    category: [String],
    file: [{
        type: {
            type: String,
            required: false,
            unique: false
        },
        url: {
            type: String,
            required: false,
            unique: false
        },
    }],
    option: [String],
    price: {
        type: Number,
        required: true,
        unique: false
    },
    quantity: {
        type: Number,
        required: true,
        unique: false
    },        
    description: {
        type: String,
        required: false,
        unique: false
    },        
    address: [String],        
    discount: { //new price < old price => discount = old - new
        type: Number,
        required: false,
        unique: false
    },
    comment: [String]
});

const product = mongoose.model('product', productSchema);

module.exports = product;