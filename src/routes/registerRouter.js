const express = require('express');
const router = express.Router();

const RegisterController = require('../app/controllers/RegisterController');

router.get('/', RegisterController.show);
router.post('/', RegisterController.register);


module.exports = router;
