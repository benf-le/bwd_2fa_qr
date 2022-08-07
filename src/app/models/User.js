

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    email: {type: String, maxlength: 255, required: true, unique: true},
    password: {type: String, maxlength: 255, required: true},
    // re_password: {type: String, maxlength: 255, required: true},

}, {
    timestamps: true,
    // collection: 'users',
})

module.exports = mongoose.model('users', User)
