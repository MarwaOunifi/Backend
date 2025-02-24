var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');
/* GET home page. */

router.post('/addProductToCart',cartController.addProductToCart);
router.post('/affect',cartController.affect);
router.post('/desaffect',cartController.desaffect);
router.get('/getCartProduct', cartController.getCartProduct);
router.get('/searchProductInCart', cartController.searchProductInCart);
router.put('/updateProductQuantity', cartController.updateProductQuantity);
router.delete('/deleteProductFromCart', cartController.deleteProductFromCart);

module.exports = router;
