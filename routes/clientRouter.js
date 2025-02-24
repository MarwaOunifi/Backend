var express = require('express');
var router = express.Router();
const clientController = require('../controllers/clientController');
const uploadFile = require('../middlewares/uploadFile');

/* GET client listing. */
router.post('/addClient', clientController.addClient );
router.post('/addClientWithImg', uploadFile.single('client_image'), clientController.addClientWithImg );
router.get('/getClientById/:id', clientController.getClientById);
router.get('/searchClientByUsername', clientController.searchClientByUsername);
router.get('/getAllClientSortByAge',clientController.getAllClientSortByAge);
router.get('/getAllClient',clientController.getAllClient);
router.put('/updateClientById/:id', clientController.updateClientById );
router.delete('/deleteClientById/:id',clientController.deleteClientById);
module.exports = router;