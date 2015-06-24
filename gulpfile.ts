/// <reference path='./typings/tsd.d.ts' />
/// <reference path="./typings/node/node.d.ts" />

var bower = require('bower');
var connect = require('gulp-connect');
var del = require('del');
var exec = require('child_process').exec;
var gulp = require('gulp');
var util = require('gulp-util');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var spawn;

var tsd = require('gulp-tsd');
var typescript = require('gulp-tsc');
var watch = require('gulp-watch');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var node;

(() => {
  var childProcess = require("child_process");
  var __spawn = childProcess.spawn;
  spawn = function () {
    console.log('spawn called');
    console.log(arguments);
    return __spawn.apply(this, arguments);
  }
})();

var paths = {
              dist: {
                      common: {
                                root: 'dist/',
                                extensions: 'dist/extensions'
                              },
                      server: 'dist/server',
                      api: 'dist/api',
                      spa: 'dist/spa'
                    },
              src: {
                     root: 'src',
                     common: {
                               root: {
                                 js: ['./src/*.js'],
                                 ts: ['./src/*.ts'],
                                 files: [
                                          './src/**/*.strings',
                                          './src/**/*.{yml,pem}'
                                        ]
                               },
                               extensions: {
                                             js: ['./src/extensions/**/*.js'],
                                             ts: ['./src/extensions/**/*.ts'],
                                             files: []
                                           }
                             },
                      api: {
                             js: ['./src/api/**/*.js'],
                             ts: ['./src/api/**/*.ts'],
                             files: [
                                      './src/api/**/*.{css,woff}',
                                      './src/api/**/*.html',
                                      './src/api/**/*.hbs',
                                      './src/api/**/*.{png,gif,jpeg,jpg,ico}'
                                    ],
                             server: ['./src/server/api.ts'],
                           },

                     spa: {
                            lib: [
                                   './bower_components/bootstrap/dist/css/bootstrap.css',
                                   './bower_components/traceur-runtime/traceur-runtime.js',
                                   './bower_components/fetch/fetch.js',
                                   './bower_components/jwt-decode/build/jwt-decode.js'
                                 ],
                            js: [
                                  './src/spa/**/*.js'
                                ],
                            ts: ['./src/spa/app/**/*.{ts,css,html}'],
                            files: [
                                     './src/spa/**/public/**/*.{css,woff}',
                                     './src/spa/**/public/**/*.{html,htm,txt}',
                                     './src/spa/**/public/**/*.hbs',
                                     './src/spa/**/public/**/*.{png,gif,jpeg,jpg,ico}'
                                   ],
                            server: ['./src/server/spa.ts']
                          }
                   }
            };

gulp.task('tsd', 
          (cb) => {
            tsd({
                  command: 'reinstall',
                  config: './tsd.json'
                }, cb);

            var git = spawn('git',
                            ['checkout', 'HEAD', 'typings\\*'],
                            {
                              stdio: [
                                0,      // use parents stdin for child
                                'pipe', // pipe child's stdout to parent
                                'pipe'  // pipe child's stderr to parent
                              ]
                            });

            git.stdout.on('data',
                          (data) => {
                            console.log(data.toString('utf8'));
                          });

            git.stderr.on('data',
                          (data) => {
                            console.log(data.toString('utf8'));
                          });

            process.exit(0);
          });

gulp.task('clean',
          (done) => {
            del([paths.dist.common.root], done);
          });


gulp.task('common:files',
          () => {
            gulp.src(paths.src.common.root.files)
                .pipe(gulp.dest(paths.dist.common.root));

            return gulp.src(paths.src.common.extensions.files)
                       .pipe(gulp.dest(paths.dist.common.extensions));
          });

gulp.task('common', ['common:js', 'common:ts', 'common:files']);

gulp.task('common:js',
          () => {
            gulp.src(paths.src.common.root.js)
                .pipe(gulp.dest(paths.dist.common.root));
            return gulp.src(paths.src.common.extensions.js)
                       .pipe(gulp.dest(paths.dist.common.extensions));
          });

gulp.task('common:ts',
          () => {
            gulp.src(paths.src.common.root.ts)
                          .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                          .pipe(plumber())
                          .pipe(sourcemaps.init())
                          .pipe(typescript({ module: 'commonjs',
                                             sourceMap: true,
                                             target: 'ES5' }))
                          .pipe(sourcemaps.write('.',
                                                 { sourceRoot: paths.src.root }))
                          .pipe(gulp.dest(paths.dist.common.root));

            return gulp.src(paths.src.common.extensions.ts)
                       .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                       .pipe(plumber())
                       .pipe(sourcemaps.init())
                       .pipe(typescript({ module: 'commonjs',
                                          sourceMap: true,
                                          target: 'ES5' }))
                       .pipe(sourcemaps.write('.',
                                              { sourceRoot: paths.src.root }))
                       .pipe(gulp.dest(paths.dist.common.extensions));
          });

gulp.task('spa:clean',
          (done) => {
              del([paths.dist.spa], done);
          });

gulp.task('spa',
          ['spa:lib', 'spa:js', 'spa:files', 'spa:watch-dev'],
          () => {

          });

gulp.task('spa:lib', 
          ['spa:bower'], 
          () => {
            var libPath = path.resolve(paths.dist.spa, 'public/lib');
            util.log('lib path: %s', libPath);
            
            return gulp.src(paths.src.spa.lib)
                       //.pipe(require('gulp-size')({
                       //                             showFiles: true,
                       //                             gzip: true 
                       //                           }))
                       .pipe(gulp.dest(libPath));
          });

gulp.task('spa:bower', 
          (done) => {
          bower.commands
               .install(null, 
                        { save: true }, 
                        { interactive: false })
               .on('error', 
                   console.error
                          .bind(console))
               .on('end', 
                   () => {
                     done();
                   });
          });

gulp.task('spa:server',
          ['common'],
          () => {
            return gulp.src(paths.src.spa.server)
                       .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                       .pipe(plumber())
                       .pipe(sourcemaps.init())
                       .pipe(typescript({ module: 'commonjs',
                                          sourceMap: true,
                                          target: 'ES5' }))
                       .pipe(sourcemaps.write('.',
                                              { sourceRoot: paths.src.root }))
                       .pipe(gulp.dest(paths.dist.server));
          });

gulp.task('spa:js', 
          () => {
              return gulp.src(paths.src.spa.js)
                         .pipe(gulp.dest(paths.dist.spa));
          });

gulp.task('spa:ts',
          () => {
            return gulp.src(paths.src.spa.ts)
                       .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                       .pipe(plumber())
                       .pipe(sourcemaps.init())
                       .pipe(typescript({ module: 'commonjs',
                                          sourceMap: true,
                                          target: 'ES5' }))
                       .pipe(sourcemaps.write('.',
                                              { sourceRoot: paths.src.root }))
                       .pipe(gulp.dest(paths.dist.common));
          });

gulp.task('spa:files', 
          () => {
              return gulp.src(paths.src.spa.files)
                         .pipe(gulp.dest(paths.dist.spa));
          });

// Dev build
gulp.task('spa:watch-dev',
          ['spa:build-dev'],
          () => {
            gulp.watch(paths.src.spa.js, ['spa:js']);
            gulp.watch(paths.src.spa.files,['spa:files']);
            gulp.watch(paths.src.spa.ts,['spa:build-dev']);
          });

gulp.task('spa:build-dev',
          (callback) => {
            // modify some webpack config options
            var config = Object.create(webpackConfig);
            config.devtool = 'sourcemap';
            config.debug = true;

            // run webpack
            webpack(config).run((err, stats) => {
                                     if (err)
                                       throw new util.PluginError('spa:build-dev', err);

                                     util.log('[spa:build-dev]',
                                              stats.toString({
                                                               colors: true
                                                             }));
                                     callback();
                                   });
          });

gulp.task('spa:serve-dev',
          (callback) => {
            // modify some webpack config options
            var config = Object.create(webpackConfig);
            config.devtool = 'eval';
            config.debug = true;

            // Start a webpack-dev-server
            new WebpackDevServer(webpack(config),
                                 {
                                    contentBase: 'dist/spa/public',
                                    publicPath: '/bin',
                                    stats: {
                                             colors: true
                                           }
                                 }).listen(8080,
                                           'localhost',
                                           (err) => {
                                             if (err)
                                               throw new util.PluginError('webpack-dev-server', err);

                                             util.log('[webpack-dev-server]',
                                                      'http://localhost:8080/index.html');
                                           });
          });

gulp.task('spa:node-dev',
          () => {
            process.env.NODE_ENV = 'development';
            gulp.start('spa:node');
          });

gulp.task('spa:node-prod',
          () => {
            process.env.NODE_ENV = 'production';
            gulp.start('spa:node');
          });

gulp.task('spa:node',
          ['spa:server'],
          (cb) => {
            if (node)
              node.kill();

            node = spawn('node',
                         ['dist/server/spa.js'],
                         {
                           stdio: [
                                    0,      // use parents stdin for child
                                    'pipe', // pipe child's stdout to parent
                                    'pipe'  // pipe child's stderr to parent
                                  ]
                         });

            node.stdout.on('data', 
                           (data) => {
                             console.log(data.toString('utf8'));
                           });

            node.stderr.on('data', 
                           (data) => {
                             console.log(data.toString('utf8'));
                           });
          });

// Production build
gulp.task('spa:build-prod',
          (callback) => {
            // modify some webpack config options
            var config = Object.create(webpackConfig);
            config.plugins = config.plugins
                                   .concat(new webpack.DefinePlugin({
                                                                      'process.env': {
                                                                                       // This has effect on the react lib size
                                                                                       'NODE_ENV': JSON.stringify('production')
                                                                                     }
                                                                    }),
                                           new webpack.optimize.DedupePlugin(),
                                           new webpack.optimize.UglifyJsPlugin());

            // run webpack
            webpack(config,
                    (err, stats) => {
                      if (err)
                        throw new util.PluginError('webpack:build-prod', err);

                      util.log('[webpack:build-prod]',
                               stats.toString({
                                                colors: true
                                              }));
                      callback();
                    });
          });

gulp.task('api:clean',
          (done) => {
              del([paths.dist.api], done);
          });

gulp.task('api',
          ['api:js', 'api:ts', 'api:files', 'api:watch-dev'],
          () => {

          });

gulp.task('api:ts', 
          () => {
              return gulp.src(paths.src.api.ts)
                         .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                         .pipe(plumber())
                         .pipe(sourcemaps.init())
                         .pipe(typescript({ module: 'commonjs',
                                            sourceMap: true,
                                            target: 'ES5' }))
                         .pipe(sourcemaps.write('.', 
                                                { sourceRoot: paths.src.root }))
                         .pipe(gulp.dest(paths.dist.api));
          });

gulp.task('api:js',
          () => {
              return gulp.src(paths.src.api.js)
                         .pipe(gulp.dest(paths.dist.api));
          });

gulp.task('api:server',
          ['common'],
          () => {
            return gulp.src(paths.src.api.server)
                       .pipe(rename({ extname: '' })) // hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
                       .pipe(plumber())
                       .pipe(sourcemaps.init())
                       .pipe(typescript({ module: 'commonjs',
                                          sourceMap: true,
                                          target: 'ES5' }))
                       .pipe(sourcemaps.write('.',
                                              { sourceRoot: paths.src.root }))
                       .pipe(gulp.dest(paths.dist.server));
          });

gulp.task('api:files', 
          () => {
              return gulp.src(paths.src.api.files)
                         .pipe(gulp.dest(paths.dist.api));
          });

gulp.task('api:watch-dev',
          [],
          () => {
              watch(paths.src.api.ts,
                    () => {
                      gulp.start('api:ts');
                    });

              watch(paths.src.api.js,
                    () => {
                      gulp.start('api:js');
                    });

              watch(paths.src.api.files,
                    () => {
                      gulp.start('api:files');
                    });
          });

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// clean up if an error goes unhandled.
process.on('exit',
           (code) => {
             console.log('Gulp process exiting...');

             if (node) 
               node.kill()
           });