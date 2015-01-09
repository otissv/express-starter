'use strict';

// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');


// Include gulp plugins
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var testem = require('gulp-testem');
var mocha = require('gulp-mocha');
var notify = require('gulp-notify');

//config
var config = {
  tests: './__tests__/**/*.js',
  testem: './__tests__/client/*.js',
  scripts: [
    './public/**/*.js',
    './server/**/*.js',
    './__tests__/**/*.js'
  ],
  nodemon: {
    script: './bin/www',
    env: { 'NODE_ENV': 'development' },
    watch: 'server/**/*.*'
  },
  browserSync: {
    files: ['public/**/*.*'],
    port: 3333,
    proxy: 'http://localhost:' + 3000,
    browser: ['google chrome'],
    reloadWait: 500
  }
};


// Error handling
// var onError = function (err) {
//   gutil.beep();
//   console.log(err);
// };

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
  .pipe(plumber(function(error) {
    // Output an error message
    gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
    // emit the end event, to properly end the task
    this.emit('end');
  })
);
};


// Lint scripts
gulp.task('lintScripts', function () {
  gulp.src(['./**/*.js', '!./node_modules/**/*.js'])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
});


// Start server
gulp.task('nodemon', function(cb) {
  var nodemon = require('gulp-nodemon');
  var called = false;

  return nodemon({
    script: config.nodemon.script,
    env: config.nodemon.env,
    watch: config.nodemon.watch
  })
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
    }, config.browserSync.reloadWait);
  });
});


// Restart browser on file change
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    files: config.browserSync.files,
    proxy: config.browserSync.proxy,
    port: config.browserSync.port,
    browser: config.browserSync.browser
  });
});


// Test server
gulp.task('coverage', function () {
  var coverageServer = http.createServer(function (req, resp) {
    req.pipe(fs.createWriteStream('coverage.json'));
    resp.end();
  });

  var port = 7358;
  coverageServer.listen(port);
  console.log('Coverage Server Started on port', port);
});


// Run browser tests
gulp.task('testem', function (done) {
  gulp.src(config.testem, {read: false})
  .pipe(testem({configFile: 'testem.json'}));
});

// Run server tests
gulp.task('mocha', function () {
  return gulp.src(config.tests, {read: false})
  .pipe(mocha({reporter: 'nyan'}))
  .on('error', notify.onError({
    message: 'Error: <%= error.message %>',
    sound: false // deactivate sound?
  }));
});


// Watch files for changes
gulp.task('watch', function () {
  gulp.watch(['./**/*.js', '!./node_modules/**/*.js'], ['lintScripts']);
});

// Run continus tests
gulp.task('test', ['mocha'], function () {
  gulp.watch([config.tests], ['mocha']);
});


// Default gulp task
gulp.task('default', [
  'lintScripts',
  'watch'
]);

// Build app for distribution.
gulp.task('build', []);
gulp.task('serve', [
  'lintScripts',
  'mocha',
  'browser-sync'
]);
