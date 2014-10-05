var dataHelper = require("./data-helper");
module.exports = function(app) {

    app.get('/getAll', function(req, res) {
        //get query to be processed
        var lang = req.query['lang'] || "english";

        query = "i18n/"+lang+",experiment";

        dataHelper.processQuery(query, lang, function(responseData) {
            //write json header and send response in json format

            res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData));
        });
    });
};