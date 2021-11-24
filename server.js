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
// Simple HTTP server.
app.listen(process.env.PORT || config.port, () => {console.log(`Vanadium running at http://localhost:${config.port}`)});
