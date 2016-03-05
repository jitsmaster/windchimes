module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts'],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};
