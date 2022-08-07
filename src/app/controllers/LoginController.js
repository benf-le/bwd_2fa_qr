const path = require('path')
const {authenticator} = require("otplib");
const jwt = require("jsonwebtoken");



/** controller get home page */
class LoginPage {
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/login.html'))
    }

    login(req, res, next) {

        const email = req.body.email;
        const password = req.body.password;
        const re_password = req.body.re_password;

        return verifyLogin(email, code, req, res, '/login')



        }


}
module.exports = new LoginPage()


