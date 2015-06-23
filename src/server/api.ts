/// <reference path="../../typings/tsd.d.ts" />

import debug = require('winston');
import express = require('express');
import http = require('http');
import path = require('path');

export interface Express {
  on(event: string, callback:Function);
}

// Express App
var app = express();
var appPort = 8081;

debug.info('NODE_ENV: %s', process.env.NODE_ENV);

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

// Your middleware
app.use(express.static(path.resolve(__dirname, '../api')));

app.listen(appPort,
           (server) => {
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

