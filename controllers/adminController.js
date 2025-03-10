const adminModel = require('../models/adminSchema');
const Admin = require('../models/adminSchema');
const jwt = require('jsonwebtoken');

const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
}


module.exports.addAdmin = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        
        const admin = await adminModel.create({
             username,
             email,
             password
            });
    
        res.status(200).json({admin});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addAdminWithImg = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const {filename} = req.file
        const admin = await adminModel.create(
            { username, email, password , admin_image: filename});
    
        res.status(200).json({admin});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.getAdminById = async (req,res) => {
    try {
        const {id} = req.params;
        const admin = await adminModel.findById(id);

        res.status(200).json({admin});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteAdminById = async (req,res) => {
    try {
        const {id} = req.params;
        const AdminExist = await adminModel.findById(id);
        if(!AdminExist){
            throw new Error("Admin not found");
        }
        await adminModel.findByIdAndDelete();

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateAdminById = async (req,res) => {
    try {
        const {id} = req.params;
        const {username, email,} = req.body;
        
        await adminModel.findByIdAndUpdate(id, {$set : { username, email}})
        const updated =  adminModel.findById(id);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.searchAdminByUsername = async (req,res) => {
    try {
       
        const {username} = req.body;
        if(!username){
            throw new Error("username is required");
        }
        const adminList =await adminModel.find({
            username: {$regex: username, $options: "i"}
        });
        
        if(!userList){
            throw new Error("Admin not found");
        }

        const count = adminList.length;
        res.status(200).json({adminList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllAdminSortByAge = async (req,res) => {
    try {
        const adminList = await adminModel.find().sort({age : 1});
        res.status(200).json({adminList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllAdmin = async (req,res) => {
    try {
        const adminList = await adminModel.find();

        res.status(200).json({adminList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.login= async (req,res) => {
    try {
        const { email , password } = req.body;
        const admin = await adminModel.login(email, password)
        const token = createToken(admin._id)
        res.cookie("jwt_token", token, {httpOnly:false,maxAge:maxTime * 1000})
        res.status(200).json({admin})
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