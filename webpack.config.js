const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill','./client/'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: './public'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};
