const path =require("path")

class SignUp2faController {
    // GET
    show(req, res) {
        // return res.sendFile(path.join(__dirname, '../../view/signup-2fa.html'))
        res.render('signup2fa')
    }
}
    module.exports = new SignUp2faController();

