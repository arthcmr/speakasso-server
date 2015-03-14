var colog = require('colog'),
    mask = require('json-mask'),
    fs = require('fs'),
    q = require('q'),
    _ = require('underscore'),
    data = {};

var image_dir = "";

//The data is a global object that will stay in memory
GLOBAL.data = data;

// build data in memory from files
loadData().done(function() {
    colog.success("All set! Running...");
});

module.exports = {

    //process content query
    processQuery: function(query, lang, doneCallback) {
        //mask data with partial response query
        var response = deepClone(mask(data, query));
        doneCallback(response);
    },

    //process results query
    processResults: function(query, results, doneCallback) {

        //mask data with partial response query
        response = mask(response, query);
        doneCallback(response);
    }
}

/***
 HELPER FUNCTIONS
 ***/

function loadData() {
    var deferred = q.defer();

    var path = "data";
    colog.info(" * Building in memory dataset");
    var promise = pathToData(path, data);

    promise.done(function() {
        colog.info(" * Dataset built sucessfully!");
        deferred.resolve();
    });

    return deferred.promise;
}

//everything in  data folder becomes the data recursively
function pathToData(path, dataset, name) {

    //promise for this subtree will be returned
    var deferred = q.defer();

    var pathStat = fs.lstatSync(path);
    // if it's a directory, we need to create a new place for it and
    // read subitems 

    if (pathStat.isDirectory()) {
        //create new place for item
        var subtree = dataset;
        if (typeof name !== 'undefined') {
            subtree = dataset[name] = {};
        }

        //read sub items
        fs.readdir(path, function(err, items) {
            var promises = [];
            items.forEach(function(item) {
                //recursively read this subtree
                promises.push(pathToData(path + "/" + item, subtree, item));
            });

            //when all promises are done, resolve the deferred.
            q.allSettled(promises).then(function() {
                deferred.resolve();
            });
        });
    }

    //if it's a file, read and extend
    else if (pathStat.isFile() && getExtension(path) === ".json") {
        var promise = readJSON(path);
        promise.done(function(content) {
            colog.warning("     File " + path + " read!");
            dataset = _.extend(dataset, content);
            deferred.resolve();
        });
    } else {
        return true;
    }

    //return promise for this subtree
    return deferred.promise;

}

//reads a file, returning a promise
function readJSON(file) {
    var deferred = q.defer();

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            colog.error("Error reading file");
            deferred.reject(new Error(err));
        } else {
            data = JSON.parse(data);
            deferred.resolve(data);
        }

    });

    return deferred.promise;
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

/***
 PROCESS RESPONSES HELPER FUNCTIONS
 ***/

function deepClone(p_object) {
    return JSON.parse(JSON.stringify(p_object));
}