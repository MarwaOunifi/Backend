const commentModel = require('../models/commentSchema');
const productModel = require('../models/productSchema');
const clientModel = require('../models/clientSchema');



module.exports.addComment = async (req,res) => {
    try {
        const { comment, clientId , productId ,rating} = req.body;
        const newComment = await commentModel.create(
            {
                comment,
                clientId,
                productId ,
                rating
            });
        
        res.status(200).json({newComment});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getCommentByProductName = async (req,res) => {
    try {
        const {product_name} = req.body;
        if(!product_name){
            throw new Error("Product name is required");
        }
        const commentList =await commentModel.find({
            product_name: {$regex: product_name, $options: "i"}
        });
        if(!commentList){
            throw new Error("Product not found");
        }

        const count = commentList.length;
        res.status(200).json({commentList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        if (!id || !comment) {
            throw new Error("ID and comment are required");
        }

        const updatedComment = await commentModel.findByIdAndUpdate(
            id,
            { comment },
            { new: true }
        );

        if (!updatedComment) {
            throw new Error("Comment not found");
        }

        res.status(200).json({ updatedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
   
module.exports.deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const commentExist = await commentModel.findById(id);
        if (!commentExist) {
            throw new Error("Comment not found");
        }
        await commentModel.findByIdAndDelete(id);

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

