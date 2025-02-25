var express = require('express');
var router = express.Router();
const clientController = require('../controllers/clientController');
const uploadFile = require('../middlewares/uploadFile');
const {requireAuthClient }= require('../middlewares/authMiddleware');

/* GET client listing. */
router.post('/addClient', clientController.addClient );
router.post('/login', clientController.login );
router.post('/logout', clientController.logout );
router.post('/addClientWithImg', uploadFile.single('client_image'), clientController.addClientWithImg );
router.get('/getClientById/:id', clientController.getClientById);
router.get('/searchClientByUsername', clientController.searchClientByUsername);
router.get('/getAllClientSortByAge',clientController.getAllClientSortByAge);
router.get('/getAllClient',requireAuthClient,clientController.getAllClient);
router.put('/updateClientById/:id', clientController.updateClientById );
router.delete('/deleteClientById/:id',clientController.deleteClientById);
module.exports = router;