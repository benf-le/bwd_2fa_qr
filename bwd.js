const express = require('express');
const app = express();
const port = process.env.PORT || 8580;
const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./src/routes');
// const mongoose = require('mongoose');
// const db = require ('./config/db/mongodb')
// const methodOverride = require('method-override')
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

//
// app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/')));
//
// app.set('views', path.join(__dirname, 'views'));
// // console.log(path.join(__dirname, 'src\\views'))

const { engine } = require('express-handlebars');



// HTTP logger
app.use(morgan('combined'));

// Template Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');



// connect DB
const db = require('./src/config/db/mongodb');
db.connect().then();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
