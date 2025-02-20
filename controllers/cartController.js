const cartModel = require('../models/cartSchema');


module.exports.addProductToCart = async (req, res) => {
    try {
        const { product_name, product_price, quantity } = req.body;
        const total = product_price * quantity;
        const cart = await cartModel.create({
            product_name,
            product_price,
            quantity,
            total
        });

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.deleteProductFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartExist = await cartModel.findById(id);
        if (!cartExist) {
            throw new Error("Product  not found in cart");
        }
        await cartModel.findByIdAndDelete(id);
        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateProductQuantity = async (req,res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCartProduct = async (req,res) => {
    try {
        const cart = await cartModel.find();
        res.status(200).json({cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports.searchProductInCart = async (req,res) => {
    try {
        const {product_name} = req.body;
        if(!product_name){
            throw new Error("Name product is required");
        }
        const cartList =await cartModel.find({
            name: {$regex: product_name, $options: "i"}
        });
        if(!cartList){
            throw new Error("Product not found in cart");
        }
        res.status(200).json({cartList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

