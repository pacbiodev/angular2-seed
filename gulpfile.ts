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
var api, spa;

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
                      root: 'dist/',
                      server: 'dist/',
                      spa: 'dist/spa/'
                    },
              src: {
                     root: 'src',
                     server: {
                               js: [
                                     './src/**/*.js',
                                     '!./src/spa/**/*.js'
                                   ],
                               ts: [
                                     './src/**/*.ts',
                                     '!./src/spa/**/*.ts'
                                   ],
                               files: [
                                        './src/**/*.{yml,pem}',
                                        '!./src/spa/**/*.{yml,pem}',
                                        './src/**/*.strings',
                                        '!./src/spa/**/*.strings',
                                        './src/**/*.{css,woff}',
                                        '!./src/spa/**/*.{css,woff}',
                                        './src/**/*.{html,htm,txt}',
                                        '!./src/spa/**/*.{html,htm,txt}',
                                        './src/**/*.hbs',
                                        '!./src/spa/**/*.hbs',
                                        './src/**/*.{png,gif,jpeg,jpg,ico}',
                                        '!./src/spa/**/*.{png,gif,jpeg,jpg,ico}'
                                      ]
                             },
                     spa: {
                       lib: [
                              './bower_components/bootstrap/dist/css/bootstrap.css',
                              './bower_components/traceur-runtime/traceur-runtime.js',
                              './bower_components/fetch/fetch.js'
                            ],
                       app: [
                              './src/spa/**/*'
                            ],
                       files: [
                                './src/spa/**/public/**/*.strings',
                                './src/spa/**/public/**/*.{css,woff}',
                                './src/spa/**/public/**/*.{html,htm,txt}',
                                './src/spa/**/public/**/*.{png,gif,jpeg,jpg,ico}'
                              ]
                     }
                   }
            };

gulp.task('tsd', 
          (cb) => {
            gulp.watch(path.resolve('./', 'typings/tsd.d.ts'),
                       () => {
                         console.log('Refreshing checked in typings');
                         var git = spawn('git',
                           ['checkout', 'HEAD', 'typings\\*'],
                           {
                             stdio: [
                               0,      // use parents stdin for child
                               'pipe', // pipe child's stdout to parent
                               'pipe'  // pipe child's stderr to parent
                             ]
                           });

                         git.stdout
                           .on('data',
                           (data) => {
                             console.log(data.toString('utf8'));
                           });

                         git.stderr
                           .on('data',
                           (data) => {
                             console.log(data.toString('utf8'));
                           });

                         git.on('close',
                                () => {
                                  cb();
                                  process.exit(0);
                                });
                       });

            tsd({
                  command: 'reinstall',
                  config: './tsd.json'
                },
                () => {
                });
          });

gulp.task('clean',
          (done) => {
            del([paths.dist.root], done);
          });

gulp.task('server', ['server:js', 'server:ts', 'server:files']);

gulp.task('server:files',
          () => {
            return gulp.src(paths.src.server.files)
                       .pipe(gulp.dest(paths.dist.root));
          });

gulp.task('server:js',
          () => {
            return gulp.src(paths.src.server.js)
                       .pipe(gulp.dest(paths.dist.root));
          });

gulp.task('server:ts',
          () => {
            return gulp.src(paths.src.server.ts)
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

gulp.task('server:watch',
          [],
          () => {
            watch(paths.src.server.ts,
              () => {
                gulp.start('server:ts');
              });

            watch(paths.src.server.js,
              () => {
                gulp.start('server:js');
              });

            watch(paths.src.server.files,
              () => {
                gulp.start('server:files');
              });
          });

gulp.task('spa:clean',
          (done) => {
            del([paths.dist.spa], done);
          });

gulp.task('spa',
          ['spa:lib', 'spa:files', 'spa:watch-dev']);

gulp.task('spa:lib', 
          ['spa:bower'], 
          () => {
            var libPath = path.resolve(paths.dist.spa, 'public/lib');
            util.log('lib path: %s', libPath);
            
            gulp.src(paths.src.spa.lib)
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

// Dev build
gulp.task('spa:watch-dev',
          ['spa:build-dev'],
          () => {
            gulp.watch(paths.src.spa.app,['spa:build-dev']);
          });

gulp.task('spa:files',
          () => {
            return gulp.src(paths.src.spa.files)
                       .pipe(gulp.dest(paths.dist.spa));
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

gulp.task('spa:node-dev',
          () => {
            process.env.NODE_ENV = 'development';
            gulp.start('spa:node');
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

gulp.task('spa:node-prod',
          () => {
            process.env.NODE_ENV = 'production';
            gulp.start('spa:node');
          });

// Build and launch SPA server
gulp.task('spa:node',
          (cb) => {
            if (spa)
              spa.kill();

            spa = spawn('node',
                        ['dist/server/spa.js'],
                        {
                          stdio: [
                                   0,      // use parents stdin for child
                                   'pipe', // pipe child's stdout to parent
                                   'pipe'  // pipe child's stderr to parent
                                 ]
                        });

            spa.stdout
               .on('data',
                   (data) => {
                     console.log(data.toString('utf8'));
                   });

            spa.stderr
               .on('data',
                   (data) => {
                     console.log(data.toString('utf8'));
                   });
          });

gulp.task('api',
          ['server', 'server:watch-dev']);

gulp.task('api:node-dev',
          () => {
            process.env.NODE_ENV = 'development';
            gulp.start('api:node');
          });

gulp.task('api:node-prod',
          () => {
            process.env.NODE_ENV = 'production';
            gulp.start('api:node');
          });

// Build and launch API server
gulp.task('api:node',
          (cb) => {
            if (api)
              api.kill();

            api = spawn('node',
                        ['--debug=45892', 'dist/server/api.js'],
                        {
                          stdio: [
                                   0,      // use parents stdin for child
                                   'pipe', // pipe child's stdout to parent
                                   'pipe'  // pipe child's stderr to parent
                                 ]
                        });

            api.stdout
               .on('data',
                   (data) => {
                     console.log(data.toString('utf8'));
                   });

            api.stderr
               .on('data',
                   (data) => {
                     console.log(data.toString('utf8'));
                   });
          });

// The development server (the recommended option for development)
gulp.task('default', ['server', 'spa']);

process.on('exit',
           (code) => {
             console.log('Gulp process exiting (status: %d)', code);

             if (spa)
               spa.kill()

             if (api)
               api.kill()
           });
