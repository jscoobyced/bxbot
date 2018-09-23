const path = require('path');
const webpack = require('webpack');
const TSLintPlugin = require('tslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionWebpackPlugin = require('git-revision-webpack-plugin');

const gitRevisionWebpackPlugin = new GitRevisionWebpackPlugin();
const root = path.join(__dirname, '../wwwroot');
const dist = path.join(root, 'dist');

module.exports = {
  mode: "development",
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  entry: {
    'vendor': ['react', 'react-dom', 'react-router-dom'],
    'main': './src/index.tsx'
  },
  output: {
    pathinfo: false,
    path: dist,
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    }
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(dist, {
      root: root
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'VERSION': JSON.stringify(gitRevisionWebpackPlugin.version())
      }
    }),
    new TSLintPlugin({
      files: ['./src/**/*.ts', './src/**/*.tsx']
    }),
    new CopyWebpackPlugin([
      {
        from: './src/data.json',
        to: dist
      },
    ],
      {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/Index.tpl.cshtml',
      filename: '../Views/Home/Index.cshtml'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.tpl.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ],
  devServer: {
    contentBase: dist,
    compress: true,
    port: 9000
  }
};