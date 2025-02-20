const orderModel = require('../models/orderSchema');

module.exports.addOrder = async (req, res) => {
    try {
        const { total, status } = req.body;
        const order = await orderModel.create({
            total,
            status
        });

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderExist = await orderModel.findById(id);
        if (!orderExist) {
            throw new Error("Order not found");
        }
        await orderModel.findByIdAndDelete(id);

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.deleteOrderByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const orderExist = await orderModel.find({ date: new Date(date) });
        if (!orderExist.length) {
            throw new Error("Order not found");
        }
        await orderModel.deleteMany({ date: new Date(date) });

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateOrderById = async (req,res) => {
    try {
        const {id} = req.params;
        const {total, status,} = req.body;
        
        await orderModel.findByIdAndUpdate(id, {$set : { total, status}})
        const updated =  orderModel.findById(id);
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.searchOrderByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const orders = await orderModel.find({ date: new Date(date) });
        if (!orders.length) {
            throw new Error("Order not found");
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllOrder = async (req,res) => {
    try {
        const orderList = await orderModel.find();

        res.status(200).json({orderList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllOrderSortByTotalPrice = async (req,res) => {
    try {
        const orderList = await orderModel.find().sort({total: 1});

        res.status(200).json({orderList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}