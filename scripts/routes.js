var dataHelper = require("./data-helper"),
    mongo = require('mongoskin'),
    colog = require('colog'),
    origin = 'http://localhost',
    db = mongo.db("mongodb://localhost:27017/perception", {
        native_parser: true
    });

module.exports = function(app) {

    app.get('/getAll', function(req, res) {
        //get query to be processed
        var lang = req.query['lang'] || "english";

        query = "i18n/" + lang + ",experiment";

        setHeaders(res, 'GET');

        dataHelper.processQuery(query, lang, function(responseData) {
            //write json header and send response in json format
            res.end(JSON.stringify(responseData));
        });
    });

    app.post('/insert', function(req, res) {
        //get query to be processed
        var responses = req.body.responses,
            language = req.body.language,
            email = req.body.email;

        setHeaders(res, 'POST');

        if (!responses || !email || !language) {
            res.end(JSON.stringify({
                success: false,
                msg: "Insufficient information"
            }));
        } else {

            //insert to DB
            db.collection('entries').insert({
                email: email,
                language: language,
                responses: responses,
            }, function(e, results) {
                if (e) {
                    res.end(JSON.stringify({
                        success: false,
                        msg: "Could not add to database",
                        error: e
                    }));
                } else {
                    res.end(JSON.stringify({
                        success: true,
                        msg: "Entry stored successfully",
                        results: results
                    }));
                }
            });
        }
    });

    app.get('/get', function(req, res) {
        //get query to be processed
        var email = req.query.email;

        setHeaders(res, 'GET');

        if (!email) {
            res.end(JSON.stringify({
                success: false,
                msg: "Insufficient information"
            }));
        } else {

            //insert to DB
            db.collection('entries').find({
                email: email
            }).toArray(function(e, results) {
                if (e) {
                    res.end(JSON.stringify({
                        success: false,
                        msg: "Could not connect to database",
                        error: e
                    }));
                } else {
                    res.end(JSON.stringify(results));
                }
            });
        }
    });

    app.delete('/remove', function(req, res) {
        //get query to be processed
        var responses = req.body.responses,
            language = req.body.language,
            email = req.body.email;

        setHeaders(res, 'DELETE');

        if (!email || email == '*') {
            res.end(JSON.stringify({
                success: false,
                msg: "Insufficient information"
            }));
        } else {
            db.collection('entries').remove({
                email: email
            }, function(e) {
                if (e) {
                    res.end(JSON.stringify({
                        success: false,
                        msg: "Error deleting from DB"
                    }));
                } else {
                    res.end(JSON.stringify({
                        success: true,
                        msg: "Entries deleted from DB"
                    }));
                }
            });
        }
    });
};

function setHeaders(res, allowed, code) {
    code = code || 200;

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', allowed);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(code, {
        'Content-Type': 'application/json'
    });
}