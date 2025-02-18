const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["in progress", "delivered", "canceled"],
        default: "in progress"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;