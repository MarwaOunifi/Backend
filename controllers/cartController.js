const cartModel = require('../models/cartSchema');
const clientModel = require('../models/clientSchema'); 


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
        const {product_name, product_price, quantity } = req.body;
        if(! id || !product_name || !product_price || !quantity){
            throw new error(" ID, product name, product price and quantity are required");
        }
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


module.exports.affect = async (req, res) => {
    try {
      const { clientId, cartId } = req.body;
  
      const cartById = await cartModel.findById(cartId);
  
      if (!cartById) {
        throw new Error(" Cart not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await cartModel.findByIdAndUpdate(cartId, {
        $set: { clients: clientId },
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $push: { carts: cartId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.desaffect = async (req, res) => {
    try {
      const { clientId, cartId } = req.body;
  
      const cartById = await cartModel.findById(cartId);
  
      if (!cartById) {
        throw new Error("cart not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await cartModel.findByIdAndUpdate(cartId, {
        $unset: { clients: 1 },// null "" 
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $pull: { carts: cartId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  