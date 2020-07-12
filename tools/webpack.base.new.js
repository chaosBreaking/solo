import path from 'path';
import alias from './alias';
import pkg from '../package.json';
import {
    ROOT_DIR,
    resolvePath,
    BUILD_DIR,
    isDebug,
    isVerbose,
    reScript,
    reStyle,
    reImage,
    happyThreadPool
} from './constants';
import HappyPack from 'happypack';
import CompressionPlugin from 'compression-webpack-plugin';

const staticAssetName = isDebug
    ? '[path][name].[ext]?[hash:8]'
    : '[hash:8].[ext]';

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

export default {
    context: ROOT_DIR,

    mode: isDebug ? 'development' : 'production',

    output: {
        path: resolvePath(BUILD_DIR, 'public/assets'),
        publicPath: '/assets/',
        pathinfo: isVerbose,
        filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: isDebug
            ? '[name].chunk.js'
            : '[name].[chunkhash:8].chunk.js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
        modules: ['node_modules', 'src'],
        alias
    },

    module: {
    // Make missing exports an error instead of warning
        strictExportPresence: true,

        rules: [
            // Rules for JS / JSX
            {
                test: reScript,
                // include: [SRC_DIR, resolvePath('tools')],
                exclude: [path.join(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: isDebug,

                    // https://babeljs.io/docs/usage/options/
                    babelrc: false,
                    configFile: false,
                    presets: [
                    // A Babel preset that can automatically determine the Babel plugins and polyfills
                    // https://github.com/babel/babel-preset-env
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: pkg.browserslist,
                                },
                                forceAllTransforms: !isDebug, // for UglifyJS
                                modules: false,
                                useBuiltIns: false,
                                debug: false,
                            },
                        ],
                        // Flow
                        // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
                        '@babel/preset-flow',
                        // JSX
                        // https://github.com/babel/babel/tree/master/packages/babel-preset-react
                        ['@babel/preset-react', { development: isDebug }],
                    ],
                    plugins: [
                        // Experimental ECMAScript proposals
                        ['@babel/plugin-proposal-decorators', {
                            legacy: true
                        }],
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        // Treat React JSX elements as value types and hoist them to the highest scope
                        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
                        ...(isDebug ? [] : ['@babel/transform-react-constant-elements']),
                        // Replaces the React.createElement function with one that is more optimized for production
                        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
                        ...(isDebug ? [] : ['@babel/transform-react-inline-elements']),
                        // Remove unnecessary React propTypes from the production build
                        // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
                        ...(isDebug ? [] : ['transform-react-remove-prop-types']),
                    ],
                },
            },
            // Rules for Style Sheets
            {
                test: reStyle,
                rules: [
                    // Convert CSS into JS module
                    {
                        issuer: { not: [reStyle] },
                        use: 'isomorphic-style-loader',
                    },
                    // Process internal/project styles (from src folder)
                    {
                        // include: reStyleModule,
                        exclude: /node_modules/,
                        loader: 'css-loader',
                        options: {
                        // CSS Loader https://github.com/webpack/css-loader
                            importLoaders: 1,
                            sourceMap: isDebug,
                            // CSS Modules https://github.com/css-modules/css-modules
                            modules: {
                                localIdentName: isDebug
                                    ? '[name]-[local]-[hash:base64:5]'
                                    : '[hash:base64:5]',
                            },
                        },
                    },
                    // Process external CSS from node_modules
                    {
                        include: /node_modules/,
                        loader: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            'sass-loader'
                        ]
                    },
                    // Compile Sass to CSS
                    // https://github.com/webpack-contrib/sass-loader
                    // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
                    {
                        test: /\.(scss|sass)$/,
                        loader: 'sass-loader',
                    },
                ],
            },

            // Rules for images
            {
                test: reImage,
                oneOf: [
                    // Inline lightweight images into CSS
                    {
                        issuer: reStyle,
                        oneOf: [
                            // Inline lightweight SVGs as UTF-8 encoded DataUrl string
                            {
                                test: /\.svg$/,
                                loader: 'svg-url-loader',
                                options: {
                                    name: staticAssetName,
                                    limit: 4096, // 4kb
                                },
                            },

                            // Inline lightweight images as Base64 encoded DataUrl string
                            {
                                loader: 'url-loader',
                                options: {
                                    name: staticAssetName,
                                    limit: 4096, // 4kb
                                },
                            },
                        ],
                    },

                    // Or return public URL to image resource
                    {
                        loader: 'file-loader',
                        options: {
                            name: staticAssetName,
                        },
                    },
                ],
            },

            // Convert plain text into JS module
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },

            // Convert Markdown into HTML
            {
                test: /\.md$/,
                loader: path.resolve(__dirname, './lib/markdown-loader.js'),
            },

            // Return public URL for all assets unless explicitly excluded
            // DO NOT FORGET to update `exclude` list when you adding a new loader
            {
                exclude: [reScript, reStyle, reImage, /\.json$/, /\.txt$/, /\.md$/],
                loader: 'file-loader',
                options: {
                    name: staticAssetName,
                },
            },

            // Exclude dev modules from production build
            ...(isDebug
                ? []
                : [
                    {
                        test: resolvePath(
                            'node_modules/react-deep-force-update/lib/index.js',
                        ),
                        loader: 'null-loader',
                    },
                ]),
        ],
    },

    // Don't attempt to continue if there are any errors.
    bail: !isDebug,

    cache: isDebug,

    // Specify what bundle information gets displayed
    // https://webpack.js.org/configuration/stats/
    stats: {
        cached: isVerbose,
        cachedAssets: isVerbose,
        chunks: isVerbose,
        chunkModules: isVerbose,
        colors: true,
        hash: isVerbose,
        modules: isVerbose,
        reasons: isDebug,
        timings: true,
        version: isVerbose,
    },

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: isDebug ? 'cheap-module-eval-source-map' : 'source-map',

    plugins: [
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|jsx|css|scss|html|svg)$/,
            threshold: 1024 * 10, // 10kb
            minRatio: 0.8,
            compressionOptions: { level: 9 },
        }),
        new HappyPack({
            id: 'happyCss',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'css-loader',
                query: {
                    minimize: !isDebug,
                    module: true, // CSS Modules https://github.com/css-modules/css-modules
                    modules: {
                        localIdentName: isDebug ? '[path][name]-[local]-[hash:base64:5]' : '[local]-[hash:base64:5]'
                    }
                },
            }],
        }),
    ]
};
