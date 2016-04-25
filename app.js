webserver = require('./server/main.js');

webserver.start({
	livereload: false,
	hostname: "0.0.0.0",
	port: process.env.PORT || 5000,
	directory: "./dist"
});
