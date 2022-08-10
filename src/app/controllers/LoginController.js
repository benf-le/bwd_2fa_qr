const path = require('path')
const {authenticator} = require("otplib");
const jwt = require("jsonwebtoken");
const express = require('express')
const User = require('../models/User')


const app = express()

// const sessionMiddleware = require('../../midlewave/mdw')
// const jwtMiddleware = require('../../midlewave/mdw')
// const QRCode = require("qrcode");
const session = require("express-session");
const expressJWT = require("express-jwt");
const QRCode = require("qrcode");



const jwtMiddleware = expressJWT({
    secret: 'supersecret',
    algorithms: ['HS256'],
    getToken: (req) => {
        return req.session.token
    }
})
function verifyLogin(email, code, req, res, failUrl,err) {

    //load user by email
    User.findOne({
        email: email,
        password: this.password,

    })
        .then (row => {
            if (!row) {
                return res.redirect('/loi')
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
        .catch(err)
    {
        res.status(500).json({ err: 'loi server'})
    }

}

/** controller get home page */
class LoginPage {
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/login.html'))
    }

    login(req, res, next) {

        const email = req.body.email;
        const password = req.body.password;
        const  code = req.body.code

        QRCode.toDataURL(authenticator.keyuri(this.email, 'KriptoExchange', this.secret), (err, url) => {
            if (err) {
                throw err
            }

            req.session.qr = url
            req.session.email = this.email
            res.redirect('/signup-2fa')

        })



}}
module.exports = new LoginPage()


