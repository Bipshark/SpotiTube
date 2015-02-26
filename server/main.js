var express = require('express'),
    app = express(),
    http = require('http'),
    https = require('https');

var youtubeKey = process.env.YOUTUBE_KEY;

var spotifySearch = function(query, callback) {
    var results = /(spotify:track:|http:\/\/open\.spotify\.com\/track\/)([\w]{22})/g.exec(query);

    if (results !== null && results[2]) {
        trackURI = results[2];

        var data = "";

        var req = https.get("https://api.spotify.com/v1/tracks/" + trackURI, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                data = JSON.parse(data);
                callback(null, data.artists[0].name + " - " + data.name);
            });
        });
    } else {
        callback("Invalid URI");
    }
};

var youtubeSearch = function(query, callback) {
    var data = "";

    var req = https.get("https://www.googleapis.com/youtube/v3/search?key=" + youtubeKey + "&part=snippet&q=" + query, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            data = JSON.parse(data);

            if (data.error)
                console.log(data.error.errors);

            if (data.items) {

                if (data.items[0]) {
                    callback(null, { title: data.items[0].snippet.title, url: "http://youtu.be/" + data.items[0].id.videoId });
                } else {
                    callback(null, { title: query });
                }
            } else {
                callback("Something went wrong when searching YouTube...");
            }
        });
    });
};

var start = function(options) {
    Promise = require("bluebird");

    var sSearch = Promise.promisify(spotifySearch);
    var ySearch = Promise.promisify(youtubeSearch);

    if (options.livereload) {
        app.use(require('connect-livereload')({
          port: 35729
        }));
    }

    app.use(express.static(options.directory));
    app.use("/img", express.static("./img"));

    app.get('/backend/:function', function(req, res) {
        if (req.query.query) {
            var uris = req.query.query.split("\n");

            Promise.map(uris, function(uri) {
                return sSearch(uri).then(ySearch).then(function(result) {
                    return result;
                });
            }).then(function(results) {
                res.send(JSON.stringify({ results: results }));
            }, function(err) {
                res.send(JSON.stringify({ error: err.message }));
            });
        } else {
            res.send(JSON.stringify({ error: "No query" }));
        }
    });

    app.listen(options.port, options.hostname);
    console.log("Started server on http://%s:%d", options.hostname, options.port);
};

module.exports.start = start;
