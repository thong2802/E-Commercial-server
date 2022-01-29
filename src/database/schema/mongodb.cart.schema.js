const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({    
    product: [String]
});

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;