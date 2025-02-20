
const productModel = require('../models/productSchema');
const commentModel = require('../models/commentSchema'); 
const clientModel = require('../models/clientSchema'); 


module.exports.addProduct = async (req,res) => {
    try {
        const {name,produit_image, description,categorie, price } = req.body;
        const product = await productModel.create(
            { 
            name,
            produit_image,
            description,
            categorie,
            price
            });
        
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const ProductExist = await productModel.findById(id);
        if(!ProductExist){
            throw new Error("Produit not found");
        }
        await productModel.findByIdAndDelete();

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const {name, description, produit_image , price } = req.body;
        if( !name || !description || !produit_image || !price){
            throw new Error("All fields are required");
        }
        await productModel.findByIdAndUpdate(id, {$set : { name, description, produit_image , price }})
        const updated =  productModel.findById(id);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.searchProductByProductName = async (req,res) => {
    try {
       
        const {name} = req.body;
        if(!name){
            throw new Error("Name product is required");
        }
        const productList =await productModel.find({
            name: {$regex: name, $options: "i"}
        });
        
        if(!productList){
            throw new Error("Product not found");
        }

        const count = productList.length;
        res.status(200).json({productList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.searchProductByProductCategory = async (req,res) => {
    try {
       
        const {categorie} = req.body;
        if(!categorie){
            throw new Error("Category product is required");
        }
        const productList =await productModel.find({
            categorie: {$regex: categorie, $options: "i"}
        });
        
        if(!productList){
            throw new Error("Product not found");
        }

        const count = productList.length;
        res.status(200).json({productList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.getAllProduct = async (req,res) => {
    try {
        const productList = await productModel.find();

        res.status(200).json({productList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.getAllProductSortByPrice = async (req,res) => {
    try {
        const produitList = await produitModel.find().sort({price : 1});
        res.status(200).json({produitList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


module.exports.addProductFavorite = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: { favorite: true } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports.addCommentToProduct = async (req, res) => {
    try {
        const { productId, userId, comment, rating } = req.body;
        const newComment = await commentModel.create({
            productId,
            userId,
            comment,
            rating
        });

        res.status(200).json({ comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.affect = async (req, res) => {
    try {
      const { clientId, productId } = req.body;
  
      const productById = await productModel.findById(productId);
  
      if (!productById) {
        throw new Error("product not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await productModel.findByIdAndUpdate(productId, {
        $set: { clients: clientId },
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $push: { products: productId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.desaffect = async (req, res) => {
    try {
      const { clientId, productId } = req.body;
  
      const productById = await productModel.findById(productId);
  
      if (!productById) {
        throw new Error("Product not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await productModel.findByIdAndUpdate(productId, {
        $unset: { clients: 1 },// null "" 
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $pull: { products: productId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  