const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ReactAnimateEnv = process.env.REACT_ANIMATE_WEBPACK;

const config = {
  entry: ['./src/index.js'],
  output: {
    path: 'dist',
    publicPath: '',
    filename: 'react-animate.css.js',
    library: 'ReactAnimateCss',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /\.test\.js/],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [new webpack.optimize.OccurenceOrderPlugin()],
};


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());

  config.module.loaders = [{
    test: /\.js$/,
    loader: 'babel',
    exclude: [/node_modules/, /index\.demo\.js/, /\.test\.js/, /app\.js/],
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
    exclude: [/node_modules/],
  }];

  config.externals = [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  ];

  config.output.filename = config.output.filename.replace(/\.js$/, '.min.js');
}

if (ReactAnimateEnv === 'server' || ReactAnimateEnv === 'demo') {
  config.entry = './src/index.demo.js';
  config.plugins = [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Animate.css',
      template: './index.ejs',
      env: ReactAnimateEnv === 'demo' ? 'production' : null,
    }),
    new ExtractTextPlugin('[name].css'),
  ];

  config.module.loaders = [
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/, /\.test\.js/],
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
      exclude: [/node_modules/],
    },
    { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
    { test: /\.svg$/, loader: 'url-loader' },
    { test: /\.woff$/, loader: 'file-loader' },
    { test: /\.ttf$/, loader: 'file-loader' },
    { test: /\.eot$/, loader: 'file-loader' },
  ];
}

module.exports = config;
