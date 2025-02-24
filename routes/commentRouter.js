var express = require('express');
var router = express.Router();
const commentController = require('../controllers/commentController');
/* GET home page. */

router.post('/addComment',commentController.addComment);
router.post('/affect',commentController.affect);
router.post('/desaffect',commentController.desaffect);
router.get('/getCommentByProductName', commentController.getCommentByProductName);
router.put('/updateCommentByProductId/:id', commentController.updateCommentById);
router.delete('/deleteCommentByProductId/:id', commentController.deleteCommentById);
module.exports = router;