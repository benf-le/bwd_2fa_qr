const path = require('path')
const {authenticator} = require("otplib");
const jwt = require("jsonwebtoken");
const express = require('express')
const User = require('../models/User')

const bcrypt = require('bcrypt')

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

function verifyLogin(email, password, code, req, res, failUrl, err) {

    //load user by email
    email = req.body.email
    User.find({email}, {"secret": 1, "password": 0, "email": 0, _id: 0}, function (data, err) {
        if (err) {
            throw err
        }
        if (!data) {
            return res.redirect('/loi')
        }

        if (!authenticator.check(code, data.secret)) {
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


}


/** controller get home page */
const LoginPage = {

    show: async (req, res) => {
        // return res.sendFile(path.join(__dirname, '../../view/login.html'))
        res.render('login.ejs')

    },


    login: async (req, res) => {
        try {

            const email = req.body.email,
                password = req.body.password,
                code = req.body.code

            //load user by email
            const emailLogin = await User.findOne({email}).lean();

            //Nhập sai pass

            if(!emailLogin){
                // res.render('404_wrong_email.ejs')
                res.send("Wrong Email. Please try again!")
            }



            // lấy data từ database của câu lệnh emailLogin check xem có đúng pass ko
            const validPassword = await bcrypt.compare(req.body.password, emailLogin.password)

            //Nhập sai pass
             if(!validPassword){
                res.render('404_wrong_pass.ejs')
            }

             //nếu nhập đúng email và pass thì chuyển qua trang account
            if(emailLogin && validPassword){
                res.redirect('/account')

            }

            // const passLogin = User.findOne({password}).lean();
            //
            // User.find({email},{"secret": 1, "password": 0, "email": 0, _id: 0},
            //     function (data, err){
            //         // if (err) {
            //         //     throw err
            //         // }
            //         // if (!data) {
            //         //     return res.redirect('/loi')
            //         // }
            //         //
            //         // if (!authenticator.check(code, data.secret)) {
            //         //     //redirect back
            //         //     return res.redirect('/login')
            //         // }
            //         //
            //         // //correct, add jwt to session
            //         // req.session.qr = null
            //         // req.session.email = null
            //         // req.session.token = jwt.sign(email, 'supersecret')
            //         //
            //         // //redirect to "private" page
            //         // return res.redirect('/private')
            //     }
            //
            // )
            //     .then((dataa)=>{
            //         res.send(dataa)
            //     })


            // return verifyLogin(emailLogin,passLogin,code, req, res, '/login',err)
        } catch (err) {
            res.status(500).send(err)
            // res.render('404_wrong_email.ejs')
        }}
}

module.exports = LoginPage

// exports = {verifyLogin}

