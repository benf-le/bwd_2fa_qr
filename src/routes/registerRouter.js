const express = require('express');
const router = express.Router();

const RegisterController = require('../app/controllers/RegisterController');

router.get('/', RegisterController.showRe);
// router.post('/', RegisterController.postRe);
// router.post('/', RegisterController.postRe);
//


module.exports = router;
