'use strict';

const path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');
const fs = require('fs-extra');
const CUSTOM_NODE_MODULES = fs.readJSONSync(path.resolve(__dirname, '../content/config/custom_node_modules.json'));

var IP = '0.0.0.0';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'index.web'),
  },
};

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'source-map',
  resolve: {
    alias: {
      'react-native': 'ReactWeb',
    },
    extensions: ['', '.js', '.jsx'],
  },
  entry: isProd? [
    'whatwg-fetch',
    'babel-polyfill',
    config.paths.index,
  ]: [
    'whatwg-fetch',
    'babel-polyfill',
    'webpack-dev-server/client?http://' + IP + ':' + PORT,
    'webpack/hot/only-dev-server',
    config.paths.index,
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': 'https://pas-dev.promisefinancial.net:8885',
      'customheaderyaw':'etse',
      // "Access-Control-Allow-Origin": "http://localhost:4000",
      // 'Access-Control-Allow-Credentials': 'true',
    },

  },
  headers: { "X-Custom-Header": "yes" },

  output: {
    path: path.join(__dirname, './output'),
    // path: path.join(__dirname, '../../public/web/output'),
    filename: 'bundle.js',
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd? PROD: DEV),
      },
    }),
    isProd? new webpack.ProvidePlugin({
      React: 'react',
    }) : new webpack.HotModuleReplacementPlugin({
      headers: {
        'Access-Control-Allow-Origin': 'https://pas-dev.promisefinancial.net:8885',
        'customheaderyaw':'etse',
        // "Access-Control-Allow-Origin": "http://localhost:4000",
        // 'Access-Control-Allow-Credentials': 'true',
      },
    }),
    // new webpack.NoErrorsPlugin(),
    new HtmlPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: [config.paths.src],
      exclude: [/node_modules/],
    }, {
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react','react-native', 'latest'],
        plugins: CUSTOM_NODE_MODULES['babel-plugins'],
      },
      include: [config.paths.src],
      exclude: [/node_modules/],
    }, {
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react','react-native', 'latest'],
        plugins: CUSTOM_NODE_MODULES['babel-plugins'],
      },
      //add your modules here
      include:  CUSTOM_NODE_MODULES['react-native-components'].map((native_component)=>{
        // console.log('list of mods',path.join(ROOT_PATH, `node_modules/${native_component.name}`))
        return path.join(ROOT_PATH, `node_modules/${native_component.name}`);
      }),
      // exclude:[/\.png$/gi]
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react','react-native', 'latest'],
        plugins: CUSTOM_NODE_MODULES['babel-plugins'],
      },
      //add your modules here
      include:  CUSTOM_NODE_MODULES['react-native-components'].map((native_component)=>{
        // console.log('list of mods',path.join(ROOT_PATH, `node_modules/${native_component.name}`))
        return path.join(ROOT_PATH, `node_modules/${native_component.name}`);
      }),
      // exclude:[/\.png$/gi]
    }, {
      // Match woff2 in addition to patterns like .woff?v=1.1.1.
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 500000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]',
      },
      include: [
        path.join(ROOT_PATH, 'web/custom_node_modules/react-native-vector-icons'),
      ],
    }, {
      // Match woff2 in addition to patterns like .woff?v=1.1.1.
      test: /\.ttf(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 5000000,
        // mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]',
      },
      include: [
        path.join(ROOT_PATH, 'web/custom_node_modules/react-native-vector-icons'),
      ],
    }, {
      test: /\.(eot|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=1000000&name=[name]-[hash].[ext]',
      include: [
        path.join(ROOT_PATH, 'web/custom_node_modules/react-native-vector-icons'),
      ],
    }, { 
      test: /\.css$/, 
      loader: 'style-loader!css-loader',
      include: [
        path.join(ROOT_PATH, 'web/custom_node_modules/react-native-vector-icons'),
      ],
    }, {
      test: /\.png$/,
      loader: 'url?limit=100000&mimetype=image/png',
      // include: config.paths.demo,
    }, {
      test: /\.jpg$/,
      loader: 'file',
      // include: config.paths.demo,
    },
    // {
    //   test   : /\.(ttf|eot|png|jpg|jpeg|gif|svg)(\?[a-z0-9-=&.]+)?$/,
    //   loader : 'file-loader',
    // },
    ],
  },
};