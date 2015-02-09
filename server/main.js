var express = require('express')
,   app = express();

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
        res.send("Jadu: " + req.query.query);
    });

    app.listen(options.port, options.hostname);
}

module.exports.start = start;
