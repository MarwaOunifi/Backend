var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');
/* GET home page. */

router.post('/addProductToCart',cartController.addProductToCart);
router.delete('/deleteProductFromCart', cartController.deleteProductFromCart);
router.put('/updateProductQuantity', cartController.updateProductQuantity);
router.get('/getCartProduct', cartController.getCartProduct);
router.get('/searchProductInCart', cartController.searchProductInCart);
module.exports = router;
