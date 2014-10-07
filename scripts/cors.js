module.exports = function(req, res, next) {
    var origin = '*'; //allow all - alternatively: 'http://localhost:9000',

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    
    next();
}