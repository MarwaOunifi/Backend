const mongoose = require('mongoose');

require('dotenv').config();
const mongoDb_Url = process.env.mongoDb_Url;


mongoose.connect( mongoDb_Url ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(err => console.error("Erreur de connexion à MongoDB:", err));
