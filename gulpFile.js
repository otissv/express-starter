'use strict';

// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// Include gulp plugins
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var jshint =     require('gulp-jshint');
var jest = require('gulp-jest');

//config
var config = {
  tests: './__tests__/**.*.js',
  scripts: {
    client: './public/**/*.js',
    server: './server/**/*.js'
  },
  nodemon: {
    script: './bin/www',
    env: { 'NODE_ENV': 'development' },
    watch: ['server/**/*.*']
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
var onError = function (err) {
  gutil.beep();
  console.log(err);
};


// Lint scripts
gulp.task('lintScripts', function () {
  gulp.src(['gulpFile.js', config.tests, config.scripts.client, config.scripts.server])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
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


//  Restart browser on file change
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    files: config.browserSync.files,
    proxy: config.browserSync.proxy,
    port: config.browserSync.port,
    browser: config.browserSync.browser
  });
});

gulp.task('jest', function () {
  return gulp.src('__tests__').pipe(jest({
    testDirectoryName: '__tests__',
    moduleFileExtensions: [
      'js',
      'json',
      'jsx'
    ]
  }));
});


// Watch files for changes
gulp.task('watch', function () {
  gulp.watch([config.scripts.client, config.tests, config.scripts.server], ['lintScripts']);
});

// Default gulp
gulp.task('default', [
  'lintScripts',
  'browser-sync',
  'watch'
]);

// Build app for distribution
gulp.task('build', []);
gulp.task('test', ['lintScripts','jest']);
