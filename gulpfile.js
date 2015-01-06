'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var open = require('gulp-open');
var server = require('gulp-express');
// var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');

var getBundleName = function() {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('javascript', function() {

  var bundler = browserify({
    entries: ['./client/src/main.coffee'],
    debug: true,
    extensions: ['.coffee']
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      // .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:3000'
  };
  gulp.src('./views/layout.jade') // An actual file must be specified or gulp will overlook the task.
  .pipe(open('', options));
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run({
    file: 'app.js'
  });
});

gulp.task('serve', [
  'javascript',
  'server'
]);