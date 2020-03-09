const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new InlineEnvironmentVariablesPlugin({ NODE_ENV: 'production' }, { warnings: false }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];

const prodEntry = {
  'map-md-app': './src/index.js'
};

module.exports = {
  entry: prodEntry,
  devtool: false,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './map-md-app.js',
    library: {
      root: 'mapmdApp',
      amd: 'map-md-app',
      commonjs: 'common-map-md-app'
    },
    libraryTarget: 'commonjs2',
    umdNamedDefine: true
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
  performance: {
    hints: false,
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000
  },
  externals: {
    'react': 'react', // Case matters here
    'react-dom': 'react-dom' // Case matters here
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=100000&name=[name]'
      }
    ]
  },
  plugins
};
