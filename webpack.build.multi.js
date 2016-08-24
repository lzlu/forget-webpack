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
        chunks: '',
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //删除空白符与换行符
            removeAttributeQuotes: true,
            minifyJS: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    };
    var exists = false;
    conf.forEach(function(e) {
        obj['template'] = '!!ejs-full!src/' + e + '/index.html';
        // 按文件夹分类
        // obj['filename'] = path.join(BUILD, e + '/index.html');
        obj['filename'] = path.join(BUILD, e + '.html');
        obj['chunks'] = [e];
        output.push(new HtmlwebpackPlugin(obj));
    });
    return [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ].concat(output);
}
// console.log(linkPlugin(CONF));
function linkPATH(conf) {
    var ENTRY = {};
    conf.forEach(function(e) {
        ENTRY[e] = [path.join(ROOT, e)]
    });
    return ENTRY;
}

module.exports = {
    entry: linkPATH(CONF),
    output: {
        path: path.join(BUILD, 'static/js'), //最终产出路径
        filename: '[name].js',
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
