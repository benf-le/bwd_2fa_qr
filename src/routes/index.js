const HomePage = require('../app/controllers/HomeController')
const newsPage = require('../app/controllers/NewController')
const AccPage = require('../app/controllers/AccountController')
const LoginPage = require('../app/controllers/LoginController')
// const SignUp2faRouter = require('./SignUp-2fa-Routes')
// const SignUp = require('./signup')
const RePassPage = require('../app/controllers/RePass_Controller')
// const registerRouter = require('./registerRouter')
const RegisterController = require('../app/controllers/RegisterController')

const { urlencoded } = require('body-parser');
const express = require("express");

const router = express.Router()

function route(app) {

    router.get('/news', newsPage.show)
    router.get('/account', AccPage.show)

    router.post('/login', LoginPage.loginn)

    router.get('/login', LoginPage.show)

    // app.use('/register', registerRouter)
    router.get('/register', RegisterController.showRe)

    router.post('/sign--up', RegisterController.postRe)
    router.get('/signup-2fa', RegisterController.get2fa)
    // router.post('/signup-2fa', RegisterController.post2fa)

    router.get('/recover-password', RePassPage.show)
    // router.get('/signup-2fa', SignUp2faRouter)
    // router.get('/signup', SignUp)
    router.get('/',HomePage.show)

    return app.use('/', router)

}

module.exports = route;
