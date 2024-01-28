const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');

const userAuthenticate = require('../middleware/auth');
router.post('/createGroup', userAuthenticate.authenticate, groupController.createGroup);

module.exports = router;