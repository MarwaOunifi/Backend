const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema ({
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

 admin_image : {
    type: String, 
    required: false, 
    default: "admin.png"
},
 count:{ 
    type : Number ,
     default: 0 
},
 age : {
     type: Number ,
      required: false
},

orders :[{type: mongoose.Schema.Types.ObjectId, ref: "order"}] ,
products :[{type: mongoose.Schema.Types.ObjectId, ref: "product"}] ,
comments :[{type: mongoose.Schema.Types.ObjectId, ref: "comment"}] ,


}, { timestamps: true }
);

adminSchema.pre("save", async function( next){
    try {
        const salt = await bcrypt.genSalt();
        const admin =this;
        admin.password = await bcrypt.hash(admin.password, salt);
        admin.count=admin.count +1;
        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.post("save", async function(req , res ,next){
  
        console.log("new admin are created & saved successfuly");
        next();
    }
);

adminSchema.statics.login = async function (email, password) {
    //console.log(email, password);
    const admin = await this.findOne({ email });
    //console.log(admin)
    if (admin) {
      const auth = await bcrypt.compare(password,admin.password);
      console.log(auth)
      if (auth) {
       // if (admin.etat === true) {
        //   if (admin.ban === false) {
            return admin;
        //   } else {
        //     throw new Error("ban");
        //   }
        //} else {
         // throw new Error("compte desactive ");
        // }
      } else {
        throw new Error("password invalid"); 
      }
    } else {
      throw new Error("email not found");
    }
};

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
