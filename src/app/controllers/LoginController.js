const path = require('path')


/** controller get home page */
class LoginPage {
    show(req, res) {
        return res.sendFile(path.join(__dirname, '../../view/login.html'))
    }
}
//
module.exports = new LoginPage()


