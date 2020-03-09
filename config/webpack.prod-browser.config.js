const path = require('path');
const webpack = require('webpack');
const WrapperPlugin = require('wrapper-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const plugins = [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new MinifyPlugin(null, { comments: false }),
  new webpack.ProvidePlugin({
    React: 'react',
    react: 'react'
  }),
  new InlineEnvironmentVariablesPlugin({ NODE_ENV: 'production' }, { warnings: false }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new WrapperPlugin({
    test: /\.js$/,
    header: (
      '(function umdWrapper(root, factory) {' +
      '  if(typeof exports === "object" && typeof module === "object")' +
      '    module.exports = factory().default;' +
      '  else if(typeof define === "function" && define.amd)' +
      '    define("NAME", [], function() { return factory().default; });' +
      '  else if(typeof exports === "object")' +
      '    exports["NAME"] = factory().default;' +
      '  else' +
      '    root["NAME"] = factory().default;' +
      '})(this, function() {' +
      'return '
    ).replace(/NAME/g, 'mapmdApp'), // this is the name of the lib
    footer: '\n})'
  })
];

const prodEntry = {
  'map-md-app': './src/index.js'
};

module.exports = {
  entry: prodEntry,
  devtool: false,
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './umd/map-md-app.js',
    library: {
      root: 'mapmdApp',
      amd: 'map-md-app',
      commonjs: 'umd-map-md-app'
    },
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [
      new MinifyPlugin(
        {
          evaluate: false,
          mangle: true
        },
        { comments: false }
      )
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            babelrc: false,
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              'minify-dead-code-elimination',
              '@babel/plugin-transform-spread',
              'add-module-exports',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-arrow-functions',
              '@babel/plugin-transform-react-constant-elements',
              '@babel/plugin-transform-react-inline-elements',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=100000&name=[name]'
      }
    ]
  },
  plugins
};
