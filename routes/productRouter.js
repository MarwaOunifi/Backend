var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
/* GET home page. */
router.post('/addProduct', productController.addProduct);
router.delete('/deleteProductById/:id', productController.deleteProductById);
router.put('/updateProductById/:id', productController.updateProductById);
router.get('/searchProductByProductName', productController.searchProductByProductName);
router.get('/searchProductByProductCategory', productController.searchProductByProductCategory);
router.get('/getAllProduct', productController.getAllProduct);
router.post('/addProductFavorite', productController.addProductFavorite);
router.post('/affect', productController.affect);
router.post('/desaffect', productController.desaffect);

module.exports = router;