const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema ({
    image_product:{
        type: String, 
        required: false, 
        default: "product.png"
         },
    product_name: {
        type: String, 
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
        default : 0
    },

}, { timestamps: true }
);

cartSchema.pre("save", async function( next){
    try {
        const cart =this;
        cart.total = cart.product_price * cart.quantity;
        next();
    } catch (error) {
        next(error);
    }
});
cartSchema.post("save", async function(req , res ,next){
        console.log("new product are added to cart");
        next();
});


const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
