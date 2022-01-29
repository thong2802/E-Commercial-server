const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({        
    account: {
        type: String,
        required: true,
        unique: false
    },    
    content: {
        type: String,
        required: true,
        unique: false
    },
    seller: { //check the user who post comment is seller of this product
        type: Boolean,
        required: true,
        unique: false
    },  
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;