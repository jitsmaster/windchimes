var autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts'],
  resolve: {
    extensions: ['', '.ts', '.js']
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
