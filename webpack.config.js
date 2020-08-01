const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    mode: "production",
    module: {
        rules: [
            /* style and css loader */
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            /* babel loader */
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            }
        ]
    },

    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),

        new CopyPlugin({
            patterns: [{
                from: "./src/img/logo.png",
                to: "./img/logo.png"
            }, ],
        }),
    ]
}