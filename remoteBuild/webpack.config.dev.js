const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
console.log(baseConfig, '=======baseConfig=======');
const serverPort = '9999';

module.exports = merge(baseConfig({
    isDebug: true,
}), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        port: serverPort,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
    },
    output: {
        publicPath: `http://localhost:${serverPort}/`,
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.join(__dirname, '../tsconfig.json'),
            async: true,
            useTypescriptIncrementalApi: true,
            reportFiles: [
                'src/**/*.{ts,tsx}',
                '!node_modules/**',
                '!**/*.json',
                '!**/__tests__/**',
                '!**/?(*.)(spec|test).*',
                '!**/src/setupProxy.*',
                '!**/src/setupTests.*',
            ],
            watch: [
                path.resolve(process.cwd(), '../src'),
            ],
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(),
    ],
});
