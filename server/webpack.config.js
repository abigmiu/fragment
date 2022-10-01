const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = function (options, webpack) {
    return {
        ...options,
        entry: ['webpack/hot/poll?100', options.entry],
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'],
            }),
        ],
        plugins: [
            ...options.plugins,
            new WebpackBuildNotifierPlugin({
                title: '碎片后端',
                suppressSuccess: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({ name: options.output.filename }),
        ],
    };
};
