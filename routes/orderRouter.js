var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
/* GET home page. */

router.post('/addOrder',orderController.addOrder);
router.post('/affect',orderController.affect);
router.post('/desaffect',orderController.desaffect);
router.get('/searchOrderByDate', orderController.searchOrderByDate);
router.get('/getAllOrder', orderController.getAllOrder);
router.get('/getAllOrderSortByTotalPrice',orderController.getAllOrderSortByTotalPrice);
router.put('/updateOrderById/:id', orderController.updateOrderById);
router.delete('/deleteOrderById/:id', orderController.deleteOrderById);
router.delete('/deleteOrderByDate', orderController.deleteOrderByDate);

module.exports = router;
