const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["in progress", "delivered", "canceled"],
        default: "in progress"
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
}, { timestamps: true });

orderSchema.pre("save", async function(next) {
    try {
        const order = this;
        // You can add any pre-save logic here
        console.log("Order is about to be saved");
        next();
    } catch (error) {
        next(error);
    }
});

orderSchema.post("save", async function(doc, next) {
    try {
        console.log("New order created & saved successfully");
        next();
    } catch (error) {
        next(error);
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;