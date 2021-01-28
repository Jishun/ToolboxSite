const path = require('path');

module.exports = {
  entry: './app.js',
  mode: 'development',
  //stats: 'verbose',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    //contentBase: [__dirname + '/static', __dirname + '/static'],
  },
//   plugins: [
//      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
//      new HtmlWebpackPlugin({
//        title: 'Development',
//      }),
//   ], 
  module: {
    rules: [
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {                 
                    presets: ['@babel/preset-env', '@babel/react' ],
                    plugins: [
                        [
                            "@babel/plugin-proposal-decorators",
                            {
                            "legacy": true
                            }
                        ],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }]
                    ]         
            }
        }
      }
    ]
  }
};