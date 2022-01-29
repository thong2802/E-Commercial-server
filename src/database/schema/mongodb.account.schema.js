const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    avatar: {
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
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    store: { //store's id of this account
        type: String,
        required: false,
        unique: true
    },
    cart: { //cart's id of this account
        type: String,
        required: false,
        unique: true
    },
    order: [String] //list of orders from this account    
});

const account = mongoose.model('account', accountSchema);

module.exports = account;