const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({

username: {type: String, unique: true},
email: {type: String,
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
 role :{
    type: String,
    enum: [ "admin" , "client"]
 },

 user_image : {type: String, required: false, default: "client.png"},
 count:{ type : Number , default: 0 } 
}, { timestamps: true }
);

userSchema.pre("save", async function( next){
    try {
        const salt = await bcrypt.genSalt();
        const user =this;
        user.password = await bcrypt.hash(user.password, salt);
        user.count=user.count +1;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.post("save", async function(req , res ,next){
  
        console.log("new user are created & saved successfuly");
        next();
    }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
