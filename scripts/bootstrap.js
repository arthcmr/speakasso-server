// Configure based on options
var nopt = require("nopt"),
	knownOpts = {
        'port': String,
    },
    shortHands = {
        'p': ['--port'],
    },
    options = nopt(knownOpts, shortHands, process.argv);

//defaults
options.port = +options.port || 3000;

//bootstrap application
module.exports = function(app) {

    app.listen(options.port);

};