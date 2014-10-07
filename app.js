var colog = require('colog'),
    bodyParser = require('body-parser'),
    cors = require('./scripts/cors');

colog.headerInfo("Starting App...");
var express = require("express"),
	app = express();

app.use(bodyParser.json());
app.use(cors);

colog.info(" * Bootstrapping data");
require('./scripts/bootstrap')(app);

colog.info(" * Setting up routes");
require('./scripts/routes')(app);