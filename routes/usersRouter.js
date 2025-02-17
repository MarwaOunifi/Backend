var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/uploadFile');

/* GET users listing. */
router.post('/addUserClient', userController.addUserClient );
router.post('/addUserAdmin', userController.addUserAdmin );
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUsersById/:id', userController.getUsersById);
router.post('/addUserClientWithImg', uploadFile.single('user_image'), userController.addUserClientWithImg );
router.put('/updateUserById/:id', userController.updateUserById );
router.get('/searchUserByUsername', userController.searchUserByUsername);
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge);
router.get('/getAllClient',userController.getAllClient);
router.get('/getAllAdmin',userController.getAllAdmin);
module.exports = router;