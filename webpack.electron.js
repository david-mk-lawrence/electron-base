const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = [
    {
        // Build Mode
        mode: "development",
        // Electron Entrypoint
        entry: "./src/main/main.ts",
        target: "electron-main",
        resolve: {
            alias: {
                ["@"]: path.resolve(__dirname, "src"),
            },
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    include: /src/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
            ],
        },
        output: {
            path: __dirname + "/dist",
            filename: "[name].js",
            libraryTarget: "commonjs2",
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "electron.package.json",
                        to: "package.json",
                    },
                ],
            }),
        ],
    },
    {
        // Build Mode
        mode: "development",
        // Electron Entrypoint
        entry: "./src/main/preload.ts",
        target: "electron-preload",
        resolve: {
            alias: {
                ["@"]: path.resolve(__dirname, "src"),
            },
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    include: /src/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
            ],
        },
        output: {
            path: __dirname + "/dist",
            filename: "preload.js",
            libraryTarget: "commonjs2",
        },
    },
]
