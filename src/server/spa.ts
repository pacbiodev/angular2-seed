/// <reference path="../../typings/tsd.d.ts" />

var webpackConfig = require('../../webpack.config');
var Express = require('express');
var Webpack = require('webpack');
var WebPackServer = require('webpack-dev-server');

import {debug, error, info, log, warn} from 'winston';
import {join as joinPaths, resolve as resolvePaths} from 'path';

var config = global['config'] = require('Konfig')({ path: resolvePaths(__dirname, '../config') });

import {Request, Response, static as ServeStatic} from 'express';

// Load Strings
import {errors, messages} from '../Strings';

// Express App
var app = Express();
var appPort = config.spa.port;

console.log('NODE_ENV: %s', process.env.NODE_ENV);

var server = new WebPackServer(Webpack(webpackConfig),
                               {
                                 path: '/spa/public/bin',
                                 contentBase: '../spa/public',
                                 quiet: false,
                                 noInfo: false,
                                 stats: { colors: true, reasons: false }
                               });

// Webpack express app that uses socket.io
server.app
      .use(app);

// Your middleware
app.use(ServeStatic(resolvePaths(__dirname, '../spa/public')));

app.use((req: Request, res: Response) => {
          // Use response.sendfile, as it streams instead of reading the file into memory.
          res.sendFile(resolvePaths(__dirname, '../spa/public/index.html'));
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

server.listen(appPort,
              function(server) {
                var addr = parseBindInfo(this);
                console.log('Listening on %s:%d using %s...',
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

