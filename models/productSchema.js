const mongoose = require('mongoose');
const produitSchema = new mongoose.Schema ({
name: {
    type: String, 
    unique: true
},


 produit_image : {
    type: String, 
    required: false, 
    default: "produit.png"
},
description : {
        type : String
},
categorie : {
        type : String
},
price : {
        type : String
},
favorite : {
        type : Boolean
},
stock : {
        type : String ,
        enum: ["in stock", "out of stock"], 
        default: "in stock"
},

}, { timestamps: true }
);

const produit = mongoose.model("produit", produitSchema);
module.exports = produit;