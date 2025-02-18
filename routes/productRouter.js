var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
/* GET home page. */
router.post('/addProduct', productController.addProduct);
router.delete('/deleteProductById', productController.deleteProductById);
router.put('/updateProductById', productController.updateProductById);
router.get('/searchProductByProductName', productController.searchProductByProductName);
router.get('/searchProductByProductCategory', productController.searchProductByProductCategory);
router.get('/getAllProduct', productController.getAllProduct);
router.post('/addProductFavorite', productController.addProductFavorite);
module.exports = router;