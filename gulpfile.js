var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var path = require('path');

var express = require('express');
var port = 3000;
var app = express();
// 新build
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var webpackConfig = require('./webpack.dev.multi.js');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack(webpackConfig);



gulp.task('less', function() {
    return gulp.src('./libs/common/common.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./quiet/libs/'));
});
gulp.task('cleanless',function(){
    return gulp.src('./libs/common/common.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./quiet/libs/'));
});
gulp.task('watchLess', function() {
    gulp.watch('./libs/common/**/*.less', ['less']);
});

gulp.task('server', ['watchLess'], function() {
        app.use(webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            noInfo: true,
            stats: {
                colors: true
            }
        }));

        app.use(webpackHotMiddleware(compiler));
        app.use(express.static(__dirname));
        app.listen(port, function() {
            console.log('listening on port ' + port);
        });
    });
    // gulp.task('dev',['server'],function(){
    //     gulp.watch('src',['server']);
    // });
