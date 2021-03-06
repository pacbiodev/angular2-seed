/// <reference path="../../typings/tsd.d.ts" />

import {debug, error, info, log, warn} from 'winston';
import {join as joinPaths, resolve as resolvePaths} from 'path';

var config = global['config'] = require('Konfig')({ path: resolvePaths(__dirname, '../config') });

import {connect} from 'mongoose';
import {RequestHandler, Request, Response} from 'express';
import {middleware as jwt} from '../api/common/jwt';

var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var Express = require('express');
var ExpressValidator = require('express-validator');
var FavIcon = require('serve-favicon');
var MethodOverride = require('method-override');

import {HttpHeaders} from '../extensions/extensions';

// Load Strings
import {errors, messages} from '../Strings';

// Express App
var app = Express();
var appPort = config.app.port;

info('NODE_ENV: %s', process.env.NODE_ENV);

connect('mongodb://localhost/pacbio');

app.use(CookieParser());
app.use(BodyParser.json());
app.use(<RequestHandler> ExpressValidator());
app.use(MethodOverride('X-HTTP-Method-Override'));

// view engine setup
app.set('views', resolvePaths(__dirname, '../api/views'));
app.set('view engine', 'hbs');

app.all('/*',
        (req: Request, res: Response, next: Function) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
          res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

          app.disable('etag');

          // Set full request URL
          (<HttpHeaders> req.headers).requestedUrl = '%s://%s%s'.sprintf(req.protocol,
                                                                         req.get('host'),
                                                                         req.originalUrl);

          next();
        });

// API Documentation
app.get('/api',
        (req: Request, res: Response, next: Function) => {
          res.status(200)
             .render('api',
                     { title: messages['default-page-title'] });

        });

app.use(FavIcon(resolvePaths(__dirname, '../api/img/favicon.png')));
app.use(Express.static(resolvePaths(__dirname, '../api')));

app.use(jwt().unless({ path: [ /^\/$/,
                               /^\/api\/auth\/login/,
                               /\/api\/{0,1}$/ ] }));

app.use('/api/auth', <RequestHandler> require('../api/routes/auth'));
app.use('/api/user', <RequestHandler> require('../api/routes/user'));

// Root will redirect to the API page. All other request to paths not
// listed in the unless middleware handler for JWT will receive a 401
// error.
app.use((req: Request, res: Response) => {
          return res.redirect('/api');
        });

// Catch All Error Handler
// @TODO add support to redirect to correct error pages when running in PROD or TEST
app.use(<ErrorRequestHandler> (err, req, res, next) => {
                               var context = {
                                               status: err.status || 500,
                                               name: err.name || err.code || errors['unknown-name'],
                                               message: err.message || errors['unknown-message'],
                                               error: err.stack || String.EMPTY
                                             };

                               res.status(context.status)
                                 .render('error/dev-error',
                                         {
                                           title: errors['error-title'].sprintf(context.status, context.name),
                                           class: 'error-body',
                                           context: context,
                                           showDetails: true
                                         });
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

