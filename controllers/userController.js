const userModel = require('../models/userSchema');

module.exports.addUserClient = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = "client";
        const user = await userModel.create(
            { username, email, password, role: roleClient });
        

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addUserClientWithImg = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = "client";
        const {filename} = req.file
        const user = await userModel.create(
            { username, email, password, role: roleClient , user_image: filename});
        

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserAdmin = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const roleAdmin = "admin";
        const user = await userModel.create(
            { username, email, password, role: roleAdmin });
        

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsers = async (req,res) => {
    try {
        const userList = await userModel.find();

        res.status(200).json({userList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getUsersById = async (req,res) => {
    try {
        const {id} = req.params;
        //console.log(req.params.id);
        const user = await userModel.findById();

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteUsersById = async (req,res) => {
    try {
        const {id} = req.params;
        const UserExist = await userModel.findById(id);
        if(!UserExist){
            throw new Error("User not found");
        }
        await userModel.findByIdAndDelete();

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

