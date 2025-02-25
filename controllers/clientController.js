const clientModel = require('../models/clientSchema');
const productModel = require('../models/productSchema');
const Client = require('../models/clientSchema');
const jwt = require('jsonwebtoken');

const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
}
module.exports.addClient = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const client = await clientModel.create(
            { username, email, password});
        
        res.status(200).json({client});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addClientWithImg = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const {filename} = req.file
        const client = await clientModel.create(
            { username, email, password, user_image: filename});
        

        res.status(200).json({client});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




module.exports.getClientById = async (req,res) => {
    try {
        const {id} = req.params;
        //console.log(req.params.id);
        const client = await clientModel.findById();

        res.status(200).json({client});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteClientById = async (req,res) => {
    try {
        const {id} = req.params;
        const ClientExist = await clientModel.findById(id);
        if(!ClientExist){
            throw new Error("Client not found");
        }
        await clientModel.findByIdAndDelete();

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateClientById = async (req,res) => {
    try {
        const {id} = req.params;
        const {username, email,} = req.body;
        
        await clientModel.findByIdAndUpdate(id, {$set : { username, email}})
        const updated =  clientModel.findById(id);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.searchClientByUsername = async (req,res) => {
    try {
       
        const {username} = req.body;
        if(!username){
            throw new Error("username is required");
        }
        const userList =await userModel.find({
            username: {$regex: username, $options: "i"}
        });
        
        if(!clientList){
            throw new Error("Client not found");
        }

        const count = clientList.length;
        res.status(200).json({clientList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllClientSortByAge = async (req,res) => {
    try {
        const clientList = await clientModel.find().sort({age : 1});
        res.status(200).json({clientList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.getAllClient = async (req,res) => {
    try {
        const clientList = await clientModel.find();

        res.status(200).json({clientList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.login= async (req,res) => {
    try {
        const { email , password } = req.body;
        const client = await clientModel.login(email, password)
        const token = createToken(client._id)
        res.cookie("jwt_token", token, {httpOnly:false,maxAge:maxTime * 1000})
        res.status(200).json({client})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.logout= async (req,res) => {
    try {
  
        res.cookie("jwt_token", "", {httpOnly:false,maxAge:1})
        res.status(200).json("logged")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}