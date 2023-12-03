const debug = require('debug');
const express = require('express');
const bodyParser = require("body-parser");

const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const smartrouter = require('./routes/smarturl');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'AppOpener APIs',
            version: '1.0.0'
        }
    },
    apis: ["./routes/*.js"],
};
const swagggerDocs = swaggerJSDOC(swaggerOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    res.status(200);
    res.send('Welcome to App Opener API Server. Please <a href="/api-doc">click here</a> to to view swagger details. </br>'+ JSON.stringify(healthcheck));
});

app.use("/", smartrouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swagggerDocs));

app.use(logger('dev'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

var server = app.listen(PORT, function () {
    console.log('Express server listening on port ' + server.address().port);
});
