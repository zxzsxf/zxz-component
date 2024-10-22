const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { componentName = 'button' } = process.env;

module.exports = function (options) {
    console.log(options, '=======options=======');
    const {
        isDebug = false,
    } = options;
    return {
        entry: `../../packages/${componentName}/index.js`,
        output: {
            filename: '[name].js',
            path: path.resolve(process.cwd(), 'dist'),
        },
        stats: {
            children: false,
        },
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src'),
            },
            extensions: ['.ts', '.tsx', 'index.ts', 'index.tsx','.js', '.json', '.jsx', 'index.js', 'index.jsx'],
        },
        // externals: {
        //     react: 'React',
        //     'react-dom': 'ReactDOM',
        //     'react-router-dom': 'ReactRouterDOM',
        // },
        plugins: [
            new VueLoaderPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: {
                                cacheDirectory: true,
                                cacheCompression: false,
                                presets: ['@babel/preset-env']
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                  noEmit: false,
                                },
                              },
                        },
                    ],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: {
                                cacheDirectory: true,
                                cacheCompression: false,
                                presets: ['@babel/preset-env']
                            },
                        },
                    ],
                },
                {
                    test: isDebug ? /\.(sc|sa|c)ss$/ : /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                          loader: "@teamsupercell/typings-for-css-modules-loader",
                          options: {
                            formatter: "prettier"
                          }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                    use: [
                        {
                          loader: 'url-loader',
                          options: {
                            limit: 10000,
                          }
                        },
                      ],
                },
            ],
        },
    };
};
