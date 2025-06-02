const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env');
const baseConfig = require('./webpack.config.base.cjs');

const { componentName = 'componentName-undefined' } = process.env;

const postcssPlugins = [
    presetEnv({
        autoprefixer: true,
        stage: 3,
    }),
    cssnano(),
]

module.exports = merge(baseConfig({
    isDebug: false,
}), {
    mode: 'production',
    output: {
        filename: `${componentName}.remote-component.[contenthash].js`,
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            plugins: postcssPlugins,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                ],
            },
        ],
    },
});
