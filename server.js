var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8083;
var database = require('./server/config/bd.config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.localUrl);

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./server/routes')(app);

app.listen(port);
console.log('Listening on port ' + port);