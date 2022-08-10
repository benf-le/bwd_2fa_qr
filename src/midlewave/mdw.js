// const expressJWT = require("express-jwt");
// const session = require('express-session')
// const express = require("express");
//
//
// session({
//     secret: 'supersecret',
// })
//
// const jwtMiddleware = expressJWT({
//     secret: 'supersecret',
//     algorithms: ['HS256'],
//     getToken: (req) => {
//         return req.session.token
//     }
// })
// module.exports ={session,jwtMiddleware}