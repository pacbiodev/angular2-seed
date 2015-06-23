/// <reference path="../../typings/tsd.d.ts" />

var webpack = require('webpack');
var config = require('../../webpack.config');
var WebPackServer = require('webpack-dev-server');

var express = require('express');
var path = require('path');

// Express App
var app = express();
var appPort = 8080;

console.log('NODE_ENV: %s', process.env.NODE_ENV);

var server = new WebPackServer(webpack(config),
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
app.use(express.static(path.resolve(__dirname, '../spa/public')));

app.use((req, res) => {
          // Use response.sendfile, as it streams instead of reading the file into memory.
          res.sendFile(path.resolve(__dirname, '../spa/public/index.html'));
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

