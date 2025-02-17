var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/uploadFile');
/* GET users listing. */
router.post('/addUserClient', userController.addUserClient );
router.post('/addUserAdmin', userController.addUserAdmin );
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUsersById', userController.getUsersById);
router.post('/addUserClientWithImg',uploadFile.single('user_image'), userController.addUserClientWithImg );
module.exports = router;
