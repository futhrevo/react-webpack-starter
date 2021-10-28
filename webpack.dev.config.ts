// https://www.carlrippon.com/creating-react-app-with-typescript-eslint-with-webpack5/

import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  devServer: {
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   static: path.resolve(__dirname, './dist'),
  //   compress: true
  // },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new TerserPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              // https://dev.to/workingeeks/speeding-up-your-development-with-webpack-5-hmr-and-react-fast-refresh-of8
              // this code will evaluate to "false" when
              // "isDevelopment" is "false"
              // otherwise it will return the plugin
              require('react-refresh/babel'),
              // this line removes falsy values from the array
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        loader: 'react-svg-loader',
        options: {
          jsx: true, // true outputs JSX tags
        },
      },
    ],
  },
};

export default config;
