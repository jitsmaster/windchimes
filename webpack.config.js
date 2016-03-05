var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts'],
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [
      path.resolve('../angular/dist/js/cjs'),
      path.join(__dirname, "node_modules")
    ]
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.css$/, loader: 'css-loader!postcss-loader'}
    ]
  },
  postcss: function() {
    return [autoprefixer];
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};
