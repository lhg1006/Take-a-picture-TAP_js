const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules|\.d\.ts$/, // this line as well
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false, // this option will solve the issue
                        },
                    },
                },
            },
            {
                test: /\.(sass|less|css)$/,
                use: ["style-loader", "css-loader", 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'react-icons': path.resolve(__dirname, 'node_modules/react-icons')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        hot: true,
        port: '3000',
        client: {
            progress: true,
        },
        proxy: {
            '/api': 'http://loaclhost:8000',
            changeOrigin: true
        },
    },
}