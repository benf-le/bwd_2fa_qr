const path = require('path')


/** controller get home page */
class RegisterPage {
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/register.html'))
    }
}
//
module.exports = new RegisterPage()

