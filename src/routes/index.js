const HomePage = require('../app/controllers/HomeController')
const newsPage = require('../app/controllers/NewController')
const AccPage = require('../app/controllers/AccountController')
const LoginPage = require('../app/controllers/LoginController')
const RegisterPage = require('../app/controllers/RegisterController')
const RePassPage = require('../app/controllers/RePass_Controller')

const { urlencoded } = require('body-parser');


function route(app) {

    app.use('/index',HomePage.show)
    app.use('/news', newsPage.show)
    app.use('/account', AccPage.show)
    app.use('/login', LoginPage.show)
    app.use('/register', RegisterPage.show)
    app.use('/recover-password', RePassPage.show)

    //
    // app.use('/login', loginRouter);
    // app.use('/register', registerRouter);
    // app.use('/', LoginController.checkAuth, siteRouter);
    // app.use('/me', LoginController.checkAuth, meRouter);
    //
    // app.use('/vietnam_books',siteController.showVietNamBooks);
    // app.use('/english_books',siteController.showEnglishBooks);
    // app.use('/abilities_books',siteController.showAbilitiesBooks)
    // app.use('/detective_books',siteController.showDetectiveBooks);
    // app.use('/comic_books',siteController.showComicBooks);

    // app.get('*', function(req, res){
    //     res.status(404).render('404');
    //   });
}

module.exports = route;
