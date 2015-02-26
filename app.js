webserver = require('./server/main.js');

webserver.start({
	livereload: false,
	hostname: "0.0.0.0",
	port: 5000,
	directory: "./dist"
});