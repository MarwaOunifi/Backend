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
        const { comment, clientId , productId ,rating} = req.body;

        if (!id || !comment || !clientId || !productId || !rating) {
            throw new Error("All fields are required");
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


module.exports.affect = async (req, res) => {
    try {
      const { clientId, commentId } = req.body;
  
      const commentById = await commentModel.findById(commentId);
  
      if (!commentById) {
        throw new Error("comment not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await commentModel.findByIdAndUpdate(commentId, {
        $set: { client: clientId },
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $push: { comments: commentId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.desaffect = async (req, res) => {
    try {
      const { clientId, commentId } = req.body;
  
      const commentById = await commentModel.findById(commentId);
  
      if (!commentById) {
        throw new Error("comment not found");
      }
      const clientExists = await clientModel.findById(clientId);
      if (!clientExists) {
        throw new Error("Client not found");
      }
  
      await commentModel.findByIdAndUpdate(commentId, {
        $unset: { client: 1 },// null "" 
      });
  
      await clientModel.findByIdAndUpdate(clientId, {
        $pull: { comments: compmentId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
