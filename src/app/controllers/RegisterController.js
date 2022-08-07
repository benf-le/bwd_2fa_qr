const path = require('path')
const {authenticator} = require("otplib");
const User = require('../models/User')
const QRCode = require("qrcode");


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://kriptoexchange:gfL5Hc4tbPtNJ3jz@cluster0.8pxnkzu.mongodb.net/?retryWrites=true&w=majority"


/** controller get home page */
class RegisterPage {
    // GET
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/register.html'))


    }

    // POST register/regis để lưu dữ liệu vào đây
    register(req, res, next){
        const user = new User(req.body);
        user
            .save()
            .then(() => res.redirect('/login'))
            .catch( function () {
                return res.json('user got duplicated')
            });
    }

}

module.exports = new RegisterPage()

