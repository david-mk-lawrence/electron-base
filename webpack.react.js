const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const { spawn } = require("child_process")

const port = 9080

module.exports = {
    mode: "development",
    entry: "./src/renderer/index.tsx",
    target: "web",
    resolve: {
        alias: {
            ["@"]: path.resolve(__dirname, "src"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    require("tailwindcss"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    },
                ],
                exclude: /\.module\.css$/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/renderer/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: port,
        compress: true,
        noInfo: false,
        stats: "errors-only",
        inline: true,
        lazy: false,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100,
        },
        before() {
            console.log("Starting Main Process...")
            spawn("npm", ["run", "electron:dev"], {
                shell: true,
                env: process.env,
                stdio: "inherit",
            })
                .on("close", code => process.exit(code))
                .on("error", spawnError => console.error(spawnError))
        },
    },
}
