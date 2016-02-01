var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_PATH = process.env.BASE_PATH || '/';

function createName(base, hash) {
  if (NODE_ENV === 'production') {
    return base.replace(/\.[^.]+$/, `.[${hash}]$&`);
  }
  return `${base}?hash=[${hash}]`;
}

module.exports = {
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      __dirname + '/assets/less/main.less'
    ],

  },
  output: {
    path: __dirname + '/public',
    filename: createName('[name].js', 'hash:10'),
    chunkFilename: createName('[id].js', 'hash:10')
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  plugins: [
    new ExtractTextPlugin(createName('common.css', 'contenthash:10'), {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Test Application',
      chunks: ['main'],
      template: `${__dirname}/index.ejs`
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
      { test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file?name=' + createName('[path][name].[ext]', 'hash:10') }
    ]
  },
  watch: true
};
