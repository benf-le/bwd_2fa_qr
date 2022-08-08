const path = require('path')
const {authenticator} = require("otplib");
const User = require('../models/User')
const QRCode = require("qrcode");




/** controller get home page */
class RegisterPage {
    // GET
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/register.html'))


    }

    // POST register/regis để lưu dữ liệu vào đây
    register(req, res, next){
        const user = new User(
            {
                email:req.body.email,
                password: req.body.password,
                secret : authenticator.generateSecret()

            });
        user
            .save()
            .then(() => res.json('Successful Registration'))
            .catch( function () {
                return res.json('user got duplicated')
            });
    }

}

module.exports = new RegisterPage()

