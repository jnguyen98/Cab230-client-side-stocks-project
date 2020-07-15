require("dotenv").config();
const yaml = require('yamljs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const options = require("./knexfile.js")
const knex = require("knex")(options)
const swaggerUI = require("swagger-ui-express")
const swaggerDocs = yaml.load('./docs/swagger.yaml');
const helmet = require("helmet")
const cors = require("cors")

const fs = require("fs")
const https = require("https")

const privateKey = fs.readFileSync("/etc/ssl/private/node-selfsigned.key", "utf8")
const certificate = fs.readFileSync("/etc/ssl/certs/node-selfsigned.crt", "utf8")
const credentials = { 
    key: privateKey,
    cert: certificate 
}


//Routes
const stockRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("common"))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

// Make the req.db connection = knex
app.use((req, res, next) => {
  req.db = knex
  next()
})

// Token
logger.token("req", (req, res) => JSON.stringify(req.headers))
logger.token("res", (req, res) => {
  const headers = {}
  res.getHeaderNames().map((h) => (headers[h] = res.getHeader(h)))
  return JSON.stringify(headers)
})

// use routes on server app
app.use('/', swaggerUI.serve);
app.use('/stocks', stockRouter);
app.use('/user', usersRouter);

// display swagger yaml file on home page
app.get('/', swaggerUI.setup(swaggerDocs));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// create server on https and listen on port 445
const server = https.createServer(credentials, app);
server.listen(443); 
module.exports = app;
