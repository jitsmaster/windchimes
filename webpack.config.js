var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts'],
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [
      path.resolve('../angular/dist/js/cjs'),
      path.resolve('../zone.js/dist'),
      path.join(__dirname, "node_modules")
    ]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel?presets[]=es2015!ts'
      },
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
