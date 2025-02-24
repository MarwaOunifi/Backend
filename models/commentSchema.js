const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    client : {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    admin : {type: mongoose.Schema.Types.ObjectId, ref: "Admin"},
    products :[{type: mongoose.Schema.Types.ObjectId, ref: "product"}] ,
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;