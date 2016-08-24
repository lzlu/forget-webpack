var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlwebpackPlugin = require('html-webpack-plugin');

// path
var ROOT = path.join(__dirname, 'src');
var BUILD = path.join(__dirname, 'build');
var CONF = require('./get_path.js');

function linkPlugin(conf) {
    var output = [];
    var obj = {
        filename: '',
        // template: '!!ejs-full!src/index.html',
        inject: 'true', //js插入的位置，true/'head'/'body'/falsem
        chunks: ''
    };
    var exists = false;
    conf.forEach(function(e) {
        obj['template'] = '!!ejs-full!src/' + e + '/index.html';
        obj['filename'] = './'+e+'.html';
        obj['chunks'] = [e];
        output.push(new HtmlwebpackPlugin(obj));
    });
    return [
         new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ].concat(output);
}
// console.log(linkPlugin(CONF));
function linkPATH(conf) {
    var ENTRY = {};
    conf.forEach(function(e) {
        ENTRY[e] = [
                'webpack-hot-middleware/client?reload=true',
                path.join(ROOT, e)]
    });
    return ENTRY;
}

module.exports = {
    entry: linkPATH(CONF),
    output: {
        path: __dirname + '/../../', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'static/[name].js',
        chunkFilename: 'static/[id].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /.css$/, loader: "style!css!css-loader!postcss-loader" },
            { test: /.less/, loader: 'style-loader!css-loader!less-loader' }, {
                test: /.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            }, {
                test: /\.xtpl$/,
                loader: 'xtpl',
            }
        ]
    },
    postcss: function() {
        return [precss, autoprefixer];
    },
    plugins: linkPlugin(CONF)
};
