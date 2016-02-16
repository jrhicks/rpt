var pkg = require('./package');
var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'app/Main.jsx')
  ],

  resolve: {
    //When requiring, you don't need to add these extensions
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    modulesDirectories: [
      'node_modules',

            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './../node_modules'),
            path.resolve(__dirname, './../components')
    ]
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },

  postcss: [autoprefixer],

  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'babel'
      },
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, "./node_modules")]
  },

  plugins: [
    new ExtractTextPlugin('react-toolbox.css', { allChunks: true }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ]

};
