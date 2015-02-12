var express = require('express'),
    app = express(),
    async = require('async'),
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
            callback(null, data.items[0].id.videoId);
        });
    });
};

var start = function(options) {
    if (options.livereload) {
        app.use(require('connect-livereload')({
          port: 35729
        }));
    }

    app.use(express.static(options.directory));

    app.get('/backend/:function', function(req, res) {
        console.log("function", req.params.function);
        console.log("query", req.query);

        async.waterfall([
            function(callback) {
                spotifySearch(req.query.query, callback);
            },
            function(result, callback) {
                youtubeSearch(result, callback);
            }
        ], function (err, result) {
            res.send(JSON.stringify(["http://youtu.be/" + result]));
        });
    });

    app.listen(options.port, options.hostname);
    console.log("Started server on http://%s:%d", options.hostname, options.port);
};

module.exports.start = start;
