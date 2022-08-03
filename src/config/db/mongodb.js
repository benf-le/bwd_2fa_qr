const mongoose = require('mongoose')
async function connect() {

    try {
        await mongoose.connect(
            'mongodb+srv://benf_le:benfle@cluster0.8pxnkzu.mongodb.net/?retryWrites=true&w=majority'
        );

        console.log('\nConnected to DataBase');
    } catch (err) {
        console.log('Disconnect');
    }

}

module.exports = { connect }