const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    logo: {
        type: String,    
        required: false,
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
    email: {
        type: String,
        required: true,
        unique: true
    },    
    address: {
        type: String,
        required: false,
        unique: false
    },
    product: [String]
});

const store = mongoose.model('store', storeSchema);

module.exports = store;