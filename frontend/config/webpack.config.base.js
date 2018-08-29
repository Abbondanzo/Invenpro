/**
 * Base webpack config used across other specific configs
 */

const path = require("path");

module.exports = {
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loaders: ["react-hot-loader/webpack", "ts-loader"],
            exclude: /node_modules/
        }]
    },

    output: {
        path: path.join(__dirname, "../dist"),
        filename: "bundle.js",
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: "commonjs2"
    },

    // https://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".json"],
        modules: [path.join(__dirname, "../dist"), "node_modules"]
    },

    plugins: [],

    externals: Object.keys(externals || {})
};