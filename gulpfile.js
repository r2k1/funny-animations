var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var cloudfront = require("gulp-cloudfront");
var aws = require('./aws-credentials.json');

var publisher = awspublish.create(aws);
var headers = {'Cache-Control': 'max-age=315360000, no-transform, public'};

gulp.task('default', function () {
  gulp.src('dist/**')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(aws));
});
