 var express = require('express');
 var port = 3000;
 var app = express();
 // 新build
 var webpackDevMiddleware = require("webpack-dev-middleware");
 var webpack = require("webpack");

 var webpackConfig = require('./webpack.dev.multi.js');
 var webpackHotMiddleware = require('webpack-hot-middleware');

 var compiler = webpack(webpackConfig);

 app.use(webpackDevMiddleware(compiler, {
     publicPath: webpackConfig.output.publicPath,
     noInfo: true,
     stats: {
         colors: true
     }
 }));

 app.use(webpackHotMiddleware(compiler));
 app.use(express.static(__dirname));
 app.listen(port, function () {
    console.log('listening on port ' + port);
});
 // 新build end
