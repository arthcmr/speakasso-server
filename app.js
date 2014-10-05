var colog = require('colog');

colog.headerInfo("Starting App...");
var express = require("express"),
	app = express();

colog.info(" * Bootstrapping data");
require('./scripts/bootstrap')(app);

colog.info(" * Setting up routes");
require('./scripts/routes')(app);