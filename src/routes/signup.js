const express = require('express');
const router = express.Router();

// const SignUp2faController = require('../app/controllers/SignUp2faController')
//
// router.get('/', SignUp2faController.show);
// router.post('/', RegisterController.register);
const RegisterController = require('../app/controllers/RegisterController');

router.post('/', RegisterController.postRe);


module.exports = router;
