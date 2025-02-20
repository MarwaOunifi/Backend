var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const uploadFile = require('../middlewares/uploadFile');

/* GET admin listing. */
router.post('/addAdmin', adminController.addAdmin );
router.get('/getAllAdmin', adminController.getAllAdmin);
router.get('/getAdminById/:id', adminController.getAdminById);
router.put('/updateAdminById/:id', adminController.searchAdminByUsername);
router.get('/getAllAdminSortByAge',adminController.getAllAdminSortByAge);
router.get('/getAllAdmin',adminController.getAllAdmin);
router.delete('/deleteAdminById/:id',adminController.deleteAdminById);
module.exports = router;