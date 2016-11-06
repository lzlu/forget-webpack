var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// path
var ROOT = path.join(__dirname, 'src');
var ASSETS = path.join(__dirname, 'assets');
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
        obj['filename'] = './dev/'+e+'.html';
        obj['chunks'] = [e];
        output.push(new HtmlwebpackPlugin(obj));
    });
    return [
         new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('static/css/[name].css')
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
        path: __dirname, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'static/[name].js',
        chunkFilename: 'static/[id].js'
    },
    resolve: {
        root: [
            path.resolve('./')
        ],
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules', 'libs'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract(["css"])
            },
            {
                test: /\.less$/,
                loader:  ExtractTextPlugin.extract(['css?sourceMap','less?sourceMap'])
            }, {
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
