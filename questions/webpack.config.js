const path = require('path')
const slsw = require('serverless-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: slsw.lib.entries,
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.mjs', '.ts', '.js', '.json', '.tsx', '.graphql']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: 'src/handler.js'
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|js)$/,
            exclude: [/node_modules/],
            loader: 'ts-loader',
          }
        ]
      },
      // {
      //   test: /\.(graphql)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: "[path]/[name].[ext]"
      //       }
      //     },
      //   ],
      // },
      {
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
        test: /\.(graphql|gql)$/,
      }
    ]
  }
}