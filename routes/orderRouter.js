var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
/* GET home page. */

router.post('/addOrder',orderController.addOrder);
router.delete('/deleteOrderById/:id', orderController.deleteOrderById);
router.delete('/deleteOrderByDate', orderController.deleteOrderByDate);
router.put('/updateOrderById/:id', orderController.updateOrderById);
router.get('/searchOrderByDate', orderController.searchOrderByDate);
router.get('/getAllOrder', orderController.getAllOrder);
router.get('/getAllOrderSortByTotalPrice',orderController.getAllOrderSortByTotalPrice)
module.exports = router;
