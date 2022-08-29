const express = require('express')
const session = require('express-session')
const {authenticator} = require('otplib')
const QRCode = require('qrcode')
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const User = require("../../app/models/User");
const {mod} = require("qrcode/lib/core/polynomial");
const path = require("path");
const app = express()


session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true,

})

const RegisterController = {
    showRe: async (req, res) => {
        try {
            res.render('register.ejs')
        } catch (err) {
            return res.status(500).json(err)

        }

        // return res.sendFile(path.join(__dirname, '../../view/register.html'))
    },

    postRe: async (req, res) => {

        try {
            //hash mat khau

            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)


            const email = req.body.email;
            const password = hashed;
            const secret = authenticator.generateSecret();

            const user = await new User(
                {
                    email: email,
                    password: password,
                    secret: secret
                });

            user
                .save()
                .then(() => {
                    // res.json('Successful Registration')
                    QRCode.toDataURL(authenticator.keyuri(email, 'KriptoExchange', secret), (err, url) => {
                        if (err) {
                            throw err

                            // return  res.status(500).json('email da duoc su dung')
                        }
                        else if(req.session.email === !email)
                        {
                            return   res.render('login.ejs')

                        }

                        else {
                            req.session.qr = url
                            req.session.email = email
                            res.redirect('/signup-2fa')
                        }



                    }),
                        function (erro) {
                            return   res.render('login.ejs')
                        }
                })
        } catch (err) {
            return res.status(500).json(err)


              // return   res.render('login.ejs')

        }


    },

    get2fa: async (req, res) => {
        try {
            if (!req.session.qr) {
                return res.redirect('/loio')

            }

            return res.render('signup__2fa.ejs', {qr: req.session.qr})
        } catch (err) {
            return  res.render('login.ejs')

        }

    },



}

    module.exports = RegisterController