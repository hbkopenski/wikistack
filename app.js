'use strict';
var express = require('express');
var app = express();
var swig = require('swig');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./models/');
const routes = require("./routes");
//var makesRouter = require('./routes');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

models.db.sync({force: true})
  .then(function () {
    app.listen(3000, function () {
      console.log('Server is listening on port 3000!');
    });
  })
  .catch(console.error);

app.use(express.static(path.join(__dirname, '/public')));

//middleware to route '/' to the homepage
app.get('/', function(req, res, next){
  res.render('index');
})

app.use('/', routes);
