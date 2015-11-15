var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var appName = 'remword';
var host = '0.0.0.0';
var port = '9000';
var env = process.env.WEBPACK_ENV;
var outputDir = '';

var plugins = [new ExtractTextPlugin('styles.css')], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputDir = '/public';
  outputFile = appName + '.min.js';
} else {
  outputDir = '/dev';
  outputFile = appName + '.js';
}

var config = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    filename: outputFile,
    path: __dirname + outputDir
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' + 'less?sourceMap'
        )
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: 'dev',
    historyApiFallback: true, // Allows to navigate to specific route from url
    hot: true,
    debug: true
  }).listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log('Local web server runs at http://' + host + ':' + port);
  console.log('-------------------------');
}

module.exports = config;
