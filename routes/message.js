const express = require('express');
const router = express.Router();
const msgController = require('../controllers/message');

const userAuthenticate = require('../middleware/auth');
router.post('/message', userAuthenticate.authenticate, msgController.addMessage);
router.get('/message', userAuthenticate.authenticate, msgController.getMessage);
router.get('/getMessages/:lastMsgId', userAuthenticate.authenticate, msgController.getMessages);

module.exports = router;