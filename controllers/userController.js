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

module.exports.updateUserById = async (req,res) => {
    try {
        const {id} = req.params;
        const {username, email,} = req.body;
        
        await userModel.findByIdAndUpdate(id, {$set : { username, email}})
        const updated =  userModel.findById(id);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.searchUserByUsername = async (req,res) => {
    try {
       
        const {username} = req.body;
        if(!username){
            throw new Error("username is required");
        }
        const userList =await userModel.find({
            username: {$regex: username, $options: "i"}
        });
        
        if(!userList){
            throw new Error("User not found");
        }

        const count = userList.length;
        res.status(200).json({userList, count});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsersSortByAge = async (req,res) => {
    try {
        const userList = await userModel.find().sort({age : 1});
        res.status(200).json({userList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.getAllClient = async (req,res) => {
    try {
        const clientList = await userModel.find({role: "client"});

        res.status(200).json({clientList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.getAllAdmin = async (req,res) => {
    try {
        const adminList = await userModel.find({role: "admin"});

        res.status(200).json({adminList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}