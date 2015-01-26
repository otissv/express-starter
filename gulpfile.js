'use strict';

// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');


// Include gulp plugins
var nodemon = require('gulp-nodemon');
var nodeInspector = require('gulp-node-inspector');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var testem = require('gulp-testem');
var run = require('gulp-run');

//config
var config = {
  host: 'localhost',
  port: 3000,
  browserSync:{
    port: 3333,
    files: 'public/**/*.*',
    browsers: ['google chrome']
  },
  coverage: {
    port: 7358
  },
  debugPort: 5858,
  nodeIspectorPort: 8080,
  nodemon: {
    script: './bin/www',
    env:    { 'NODE_ENV': 'development' },
    watch:  'server/**/*.*',
    nodeArgs: ['--debug']
  },
  scripts: [
    './gulpfile.js',
    './public/**/*.js',
    './config/**/*.js',
    './database/*.js',
    './server/*.js',
    './lib/*.js',
    './tests/**/*.js',
    '!./node_modules/**/*.js'
  ],
  tests: './tests/**/*.js',
  testem: './tests/client/*.js',
  divider: '=============================================================='
};


// Error handling
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
  .pipe(plumber(function(error) {
    gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
    this.emit('end');
  })
);
};


// Lint scripts
gulp.task('lint', function () {
  gulp.src(config.scripts)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
  console.log(config.divider);
});


gulp.task('nodemon', function(cb) {
  var nodemon = require('gulp-nodemon');
  var called = false;

  return nodemon(config.nodemon)
  .on('start', function onStart() {
    if (!called) {
      cb();
    }
    called = true;
  })
  .on('restart', function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

// Debug node
gulp.task('debug', function () {
  run('node-inspector').exec();
});

// Restart browser on file change
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    files: config.browserSync.files,
    proxy: 'http://' + config.host +':' + config.port,
    port: config.browserSync.port,
    browser: config.browserSync.browsers
  });
});


// Test server
gulp.task('coverage', function () {
  var coverageServer = http.createServer(function (req, resp) {
    req.pipe(fs.createWriteStream('coverage.json'));
    resp.end();
  });
  coverageServer.listen(config.coverage.port);
  console.log('Coverage Server Started on port', config.coverage.port);
});


// Run browser tests
gulp.task('testem', function (done) {
  gulp.src(config.testem, {read: false})
  .pipe(testem({configFile: 'testem.json'}));
});


// Watch files for changes
gulp.task('watch', function () {
  gulp.watch(config.scripts, ['lint']);
});


// Start server
gulp.task('serve', ['browser-sync', 'debug']);


// Build app for distribution.
gulp.task('build', []);


// Default gulp task
gulp.task('default', ['lint', 'watch']);
