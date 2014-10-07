var dataHelper = require("./data-helper"),
    mongo = require('mongoskin'),
    colog = require('colog'),
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
            email = req.body.email,
            blindness = req.body.blindness;

        setHeaders(res, 'POST');

        if (!responses || !email || !language || !blindness) {
            res.end(JSON.stringify({
                success: false,
                msg: "Insufficient information"
            }));
        } else {

            db.collection('entries').find({
                email: email
            }).toArray(function(e, results) {
                if (e) {
                    res.end(JSON.stringify({
                        success: false,
                        msg: "Could not connect to database",
                        error: e
                    }));
                } else if (results.length > 0) {
                    res.end(JSON.stringify({
                        success: false,
                        msg: "E-mail is already in the database",
                        exists: true,
                    }));
                } 
                else {
                    //insert to DB
                    db.collection('entries').insert({
                        email: email,
                        language: language,
                        responses: responses,
                        blindness: (blindness == "true") ? true : false
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

            //find specific one
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

    app.get('/results', function(req, res) {

        query = req.query['q'] || "";
        email = req.query['email'];

        setHeaders(res, 'GET');

        var user = (email) ? {
            email: email
        } : {};

        //dont get blind user results
        user.blindness = false;

        //find all responses
        db.collection('entries').find(user).toArray(function(e, results) {
            if (e) {
                res.end(JSON.stringify({
                    success: false,
                    msg: "Could not connect to database",
                    error: e
                }));
            } else {

                dataHelper.processResults(query, results, function(responseData) {
                    //write json header and send response in json format
                    res.end(JSON.stringify(responseData));
                });
            }
        });
    });

};

function setHeaders(res, allowed, code) {
    code = code || 200;
    res.writeHead(code, {
        'Content-Type': 'application/json'
    });
}