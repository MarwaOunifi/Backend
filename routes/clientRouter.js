var express = require('express');
var router = express.Router();
const clientController = require('../controllers/clientController');
const uploadFile = require('../middlewares/uploadFile');

/* GET client listing. */
router.post('/addClient', clientController.addClient );
router.get('/getClientById/:id', clientController.getClientById);
router.post('/addClientWithImg', uploadFile.single('client_image'), clientController.addClientWithImg );
router.put('/updateClientById/:id', clientController.updateClientById );
router.get('/searchClientByUsername', clientController.searchClientByUsername);
router.get('/getAllClientSortByAge',clientController.getAllClientSortByAge);
router.get('/getAllClient',clientController.getAllClient);
router.delete('/deleteClientById',clientController.deleteClientById);
module.exports = router;