var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./scripts/app.js', './styles/styles.scss'],
  output: {
    filename: 'dist/js/scripts.min.js',
    publicPath: '/'
  },
  module: {

    rules: [
      { // sass / scss loader for webpack
        test: /\.(sass|scss|css)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/css/styles.min.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: {
            glob:'./images/*',
            dot: true
        },
        to: './dist'
      }
    ])
  ],
  devServer: {
      contentBase: path.resolve(__dirname),
      inline: true
  }
};