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

    // POST
    regis(res, req, next, err) {
// res.json(req.body)
//
        const user = new User(req.body)
        user
            .save()
            .then(() => res.redirect('/login'))
            .catch(function () {
                // return res.json('user got duplicated')
                res.send(err)

            })

        // const user = new User(req.body);
        // user.save()
        //     .then(() => res.redirect('/login'))
        //     // .catch(function () {
        //     //     // return res.json('user got duplicated')
        //     // })

    }

}
module.exports = new RegisterPage()

