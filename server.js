const http = require('http'),
    https = require('https'),
    fs = require('fs'),
    config = require('./config.json'),
    Corrosion = require('corrosion'),
    express = require('express'),
    proxy = new Corrosion({
        prefix: config.prefix,
        codec: 'xor'
    }),
    app = express(),
    gamermode = (req, res) => {
        if (req.url.startsWith(config.prefix)) return proxy.request(req, res);
        req.pathname = req.url.split('#')[0].split('?')[0];
        req.query = {};};
app.use('/', express.static(__dirname + '/public'));
app.use('/', gamermode);

//This is the simple HTTP server. Remove the HTTPS server and use this if you encounter errors.
//
//app.listen(config.port, () => {console.log(`Hacker proxy running at http://localhost:${config.port}`)});
 
// This is the HTTPS server.
https.createServer({
	  key: fs.readFileSync('./ssl/default.key'),
	cert: fs.readFileSync('./ssl/default.crt')}, app)
	.listen(process.env.PORT || config.port, function () {console.log(`Hacker proxy running at http://localhost:${config.port}`)});
//Remove this if self-signed SSL is a problem for you.
