var colog = require('colog'),
    bodyParser = require('body-parser');

colog.headerInfo("Starting App...");
var express = require("express"),
	app = express();

app.use(bodyParser.json());

colog.info(" * Bootstrapping data");
require('./scripts/bootstrap')(app);

colog.info(" * Setting up routes");
require('./scripts/routes')(app);