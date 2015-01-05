'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var app = {
  client: 'public/',
  server: 'server/',
  port: 3000
}

var config = {
  nodemon: {
    script: './bin/www',
    env: { 'NODE_ENV': 'development' },
    watch: [app.server + '**/*.*']
  },
  browserSync: {
    files:      [app.client + '**/*.*'],
    port:       3333,
    proxy:      'http://localhost:' + app.port,
    browser:    ['google chrome'],
    reloadWait: 500
  }
};

var defaultTasks = [
  'browser-sync',
];
var buildTasks = [];


var onError = function (err) {
  gutil.beep();
  console.log(err);
};


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


gulp.task('browser-sync', ['nodemon'], function() {

  browserSync.init({
    files: config.browserSync.files,
    proxy: config.browserSync.proxy,
    port: config.browserSync.port,
    browser: config.browserSync.browser
  });
});


// Tasks
gulp.task('default', defaultTasks);
gulp.task('build', buildTasks);
