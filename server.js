const http = require('http'),
    https = require('https'),
    fs = require('fs'),
    mime = require('mime-types'),
    config = require('./config.json'),
    Corrosion = require('corrosion'),
    proxy = new Corrosion({
        prefix: config.prefix,
        codec: 'xor'
    }),
    app = (req, res) => {
        if (req.url.startsWith(config.prefix)) return proxy.request(req, res);
        req.pathname = req.url.split('#')[0].split('?')[0];
        req.query = {};
        const publicPath = __dirname + '/public' + req.pathname;
        mime.contentType(publicPath);
        const error = () => (res.statusCode = 404, res.end(fs.readFileSync(__dirname + '/error.html', 'utf-8').replace('%ERR%', `Cannot ${req.method} ${req.pathname}`)))
        fs.lstat(publicPath, (err, stats) => {
            if (err) return error();
            res.setHeader("Content-Type", mime.lookup(req.pathname)), res.writeHead(200), stats.isDirectory() ? fs.existsSync(publicPath + 'index.html') ? fs.createReadStream(publicPath + 'index.html').pipe(res) : error() : !stats.isFile() || publicPath.endsWith("/") ? error() : fs.createReadStream(publicPath).pipe(res);
        });
    },
    server = config.ssl ? https.createServer({
        key: fs.readFileSync("./ssl/default.key"),
        cert: fs.readFileSync("./ssl/default.crt")
    }, app) : http.createServer(app);

server.listen(process.env.PORT || config.port, () => console.log(`${config.ssl ? 'https://' : 'http://'}0.0.0.0:${config.port}`));
