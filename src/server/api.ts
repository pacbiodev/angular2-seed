/// <reference path="../../typings/tsd.d.ts" />

import Debug = require('winston');
import Express = require('express');
import Http = require('http');
import Path = require('path');

var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var MethodOverride = require('method-override');
var FavIcon = require('serve-favicon');

// Load Strings
import Strings = require('../Strings');

// Express App
var app = Express();
var appPort = 8081;

Debug.info('NODE_ENV: %s', process.env.NODE_ENV);

app.use(CookieParser());
app.use(BodyParser.json());
app.use(MethodOverride('X-HTTP-Method-Override'));

// view engine setup
app.set('views', Path.resolve(__dirname, '../api/views'));
app.set('view engine', 'hbs');

app.all('/*',
        (req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token');
          res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

          app.disable('etag');

          // Set full request URL
          req.headers['requestedUrl'] = '%s://%s%s'.sprintf(req.protocol,
                                                            req.get('host'),
                                                            req.originalUrl);

          next();
        });

// API Documentation
app.get('/api',
        (req, res, next) => {
          res.status(200)
             .render('api',
                     { title: Strings.messages['default-page-title'] });

        });

app.use(FavIcon(Path.resolve(__dirname, '../api/img/favicon.png')));
app.use(Express.static(Path.resolve(__dirname, '../api')));

// Root will redirect to the API page. All other request to paths not
// listed in the unless middleware handler for JWT will receive a 401
// error.
app.use((req, res) => {
          return res.redirect('/api');
        });

app.listen(appPort,
           function () {
             var addr = parseBindInfo(this);
             console.log('listening on %s:%d using %s...',
                         addr.address, addr.port, addr.family);
           });

function parseBindInfo(server) {
    var token = ':', tokenLength = token.length;
    var key = server['_connectionKey'];
    var indices = [
                      key.indexOf(token),
                      key.lastIndexOf(token)
                  ];
    var address = key.substr(indices[0] + tokenLength,
                             indices[1] - indices[0] - tokenLength );
    if (address == 'null')
        address = '0.0.0.0';
    return {
        address: address,
        family: 'IPv' + key.substr(0, indices[0]),
        port: key.substr(indices[1] + 1)
    };
}

