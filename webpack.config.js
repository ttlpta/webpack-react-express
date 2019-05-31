const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = [
  {
    mode : 'development', 
    watch : true,
    entry: './src/server.js',
    output: {
      path:  __dirname + '/dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader']
        }
      ]
    }
  },
  {
    mode : 'development', 
    entry: path.resolve(__dirname, 'src/app/browser.js'),
    output: {
      path: __dirname + '/dist/assets',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    }
  },
  {
    mode : 'development', 
    entry: {
      index: path.resolve(__dirname, 'src/test/styles.css'),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          fooStyles: {
            name: 'foo',
            test: (m, c, entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            enforce: true,
          }
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  }
];
