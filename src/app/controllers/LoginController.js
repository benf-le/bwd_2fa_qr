const path = require('path')
const {authenticator} = require("otplib");
const jwt = require("jsonwebtoken");
const express = require('express')

const app = express()

const session = require('express-session')
const sqlite3 = require("sqlite3");

app.use(session({
    secret: 'supersecret',
}))

const jwtMiddleware = require('../../midlewave/mdw')
const QRCode = require("qrcode");


function verifyLogin(email, code, req, res, failUrl) {
    //load user by email
    const db = new sqlite3.Database('db.sqlite')
    db.serialize(() => {
        db.get('SELECT secret FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                throw err
            }

            if (!row) {
                return res.redirect('/')
            }

            if (!authenticator.check(code, row.secret)) {
                //redirect back
                return res.redirect(failUrl)
            }

            //correct, add jwt to session
            req.session.qr = null
            req.session.email = null
            req.session.token = jwt.sign(email, 'supersecret')

            //redirect to "private" page
            return res.redirect('/private')
        })
    })
}

/** controller get home page */
class LoginPage {
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/login.html'))
    }

    login(req, res, next) {

        const email = req.body.email;
        const password = req.body.password;

        const code = req.body.code

        QRCode.toDataURL(authenticator.keyuri(email, 'KriptoExchange', secret), (err, url) => {
            if (err) {
                throw err
            }

            req.session.qr = url
            req.session.email = email
            res.redirect('/sign-up-2fa')


        })}


}
module.exports = new LoginPage()


