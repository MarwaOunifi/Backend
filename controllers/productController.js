const productModel = require('../models/productSchema');
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