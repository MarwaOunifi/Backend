var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
/* GET home page. */
router.post('/addProduct', productController.addProduct);
router.post('/addProductFavorite', productController.addProductFavorite);
router.post('/affect', productController.affect);
router.post('/desaffect', productController.desaffect);
router.get('/searchProductByProductName', productController.searchProductByProductName);
router.get('/searchProductByProductCategory', productController.searchProductByProductCategory);
router.get('/getAllProduct', productController.getAllProduct);
router.put('/updateProductById/:id', productController.updateProductById);
router.delete('/deleteProductById/:id', productController.deleteProductById);
module.exports = router;