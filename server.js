var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var hbs = require('express-hbs');
var http = require('http');
var _ = require('lodash');

// Remove the powered-by header
app.set('x-powered-by', false);

// Set up view engine to be used
app.set('view engine', 'html');
app.engine('html', hbs.express3());
app.set('views', path.join(__dirname, 'build'));

// Register a status endpoint to check availability
app.get('/status', function(req, res) {
    return res.send('Zipline app');
});

// Serve the apple-app-site-association file
var aasa = fs.readFileSync(path.join(__dirname, 'build/assets/apple-app-site-association'));
app.get('/apple-app-site-association', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(aasa);
});

// Serve static assets on a /static/ route prefix
app.use('/', express.static(path.join(__dirname, 'build')));

// Allow any route to render the Angular app
app.use('*', function(req, res) {
    var pathParts = req.originalUrl.slice('1').split('/');

    function isUsername(value) {
        return /^(\w|_)+$/.test(value);
    }

    function isNumeric(value) {
        return /^(\d)+$/.test(value);
    }

    if (pathParts.length === 2 && isUsername(pathParts[0]) && isNumeric(pathParts[1])) {
        var username = pathParts[0];
        var shortId = pathParts[1];
        var path = '/api/v1/username?q=' + username;
        var options = {
            host: 'api.dev.zipline.co',
            path: path
        };

        var callback = function(response) {
            var body = '';

            response.on('data', function(d) {
                body += d;
            });

            response.on('end', function() {
                var user = JSON.parse(body);
                var broadcast = _.find(user.broadcasts, _.matchesProperty('shortId', shortId));
                var metaTagData;

                if (broadcast) {
                    var thumbnail = (broadcast.thumbs[3] ?
                        broadcast.thumbs[3].url :
                        'https://s3.amazonaws.com/zipline.assets/Z.png'
                    );

                    metaTagData = {
                        username: username,
                        shortId: shortId,
                        title: broadcast.name,
                        broadcasterName: user.displayName,
                        thumbnail: thumbnail
                    };
                }

                res.render('index', metaTagData);
            });
        };

        http.request(options, callback).end();

    } else {
        res.render('index', {username: '', shortId: ''});
    }
});

// Listen on port 8180 or the default environment port
app.listen(process.env.PORT || 8180, function() {
    console.log('App running...');
});
