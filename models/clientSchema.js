const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const clientSchema = new mongoose.Schema ({
username: {
    type: String, 
    unique: true
},
email: {
     type: String,
     required: true, 
     unique: true,
     lowercase: true,
     match:[
        /^\S+@\S+\.\S+$/,
        "Veuillez entrer une adresse e-mail valide"
]},
password: {
     type: String,
     required: true ,
     minLength: 8 , 
     match:[
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un chiffre"
]},

 client_image : {
    type: String, 
    required: false, 
    default: "client.png"
},
 count:{ 
    type : Number ,
     default: 0 
},
 age : {
     type: Number ,
      required: false
},
products :[{type: mongoose.Schema.Types.ObjectId, ref: "product"}] ,
carts :[{type: mongoose.Schema.Types.ObjectId, ref: "cart"}] ,
orders :[{type: mongoose.Schema.Types.ObjectId, ref: "order"}] ,
comments :[{type: mongoose.Schema.Types.ObjectId, ref: "comment"}] ,

}, { timestamps: true }
);

clientSchema.pre("save", async function( next){
    try {
        const salt = await bcrypt.genSalt();
        const client =this;
        client.password = await bcrypt.hash(client.password, salt);
        client.count=client.count +1;
        next();
    } catch (error) {
        next(error);
    }
});

clientSchema.post("save", async function(req , res ,next){
  
        console.log("new client are created & saved successfuly");
        next();
    }
);

const client = mongoose.model("client", clientSchema);
module.exports = client;