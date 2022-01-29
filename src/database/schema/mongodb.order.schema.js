const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({    
    time: {
        type: String,
        required: true,
        unique: false
    },
    product: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    phone: {
        type: String,
        required: true,
        unique: false
    },
    address: [String], //[country, city, address]
    option: {
        type: String,
        required: false,
        unique: false
    },
    quantity: {
        type: Number,
        required: true,
        unique: false
    },
    price: [Number], //[product cost, shipping cost]
    state: { //waiting - confirmed - shipping - paid
        type: String,
        required: true,
        unique: false
    }  
});

const order = mongoose.model('order', orderSchema);

module.exports = order;