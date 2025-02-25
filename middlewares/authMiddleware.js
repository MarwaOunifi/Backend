const jwt = require("jsonwebtoken");
const clientModel = require("../models/clientSchema");

const requireAuthClient = (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (token) {
    jwt.verify(token, 'net secret pfe', async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        req.session.client = null;  //session null
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.session.client = await clientModel.findById(decodedToken.id); //session feha client
        next();
      }
    });
  } else {
    req.session.client = null; //session null
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { requireAuthClient };