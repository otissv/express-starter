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
  tests: './tests/**/*.js',
  testem: './tests/client/*.js',
  scripts: [
    './public/**/*.js',
    './server/**/*.js',
    './tests/**/*.js'
  ]
};


// Error handling
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
gulp.task('lint', function () {
  gulp.src(['./**/*.js', '!./node_modules/**/*.js'])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
  console.log('==============================================================');
});


gulp.task('nodemon', function(cb) {
  var nodemon = require('gulp-nodemon');
  var called = false;

  return nodemon({
    script: './bin/www',
    env: { 'NODE_ENV': 'development' },
    watch: 'server/**/*.*'
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
    }, 500);
  });
});


// Restart browser on file change
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    files: ['public/**/*.*'],
    proxy: 'http://localhost:' + 3000,
    port: 3333,
    browser: ['google chrome']
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
// gulp.task('mocha', function (done) {
//   run('mongo database/test.db.reset.js').exec();
//   gulp.src(config.tests, {read: false})
//   .pipe(mocha({reporter: 'spec'}))
//   .on('error', notify.onError({
//     message: 'Error: <%= error.message %>',
//     sound: false // deactivate sound?
//   }))
//   .exit();
// });

// gulp.task('dbClean', function(done) {
//   run('mongo database/test.db.reset.js').exec();
// });
//
// gulp.task('test', function (done) {
//   run('mocha tests/**/*.js --watch').exec();
// });


// Watch files for changes
gulp.task('watch', function () {
  gulp.watch(
    [
    './*.js',
    './config/*.js',
    './database/*.js',
    './server/*.js',
    './lib/*.js'
    ],
    ['lint']);
});

// Watch script file for changes and run tests
// gulp.task('test', ['mocha'], function () {
//   gulp.watch([config.scripts, config.tests], batch(function (events, cb) {
//     gulp.src([config.tests])
//      .pipe(gulp.start('mocha'));
//   }));
// });

//

// Start server
gulp.task('serve', ['browser-sync']);


// Build app for distribution.
gulp.task('build', []);


// Default gulp task
gulp.task('default', ['lint', 'watch']);
