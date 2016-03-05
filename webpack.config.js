module.exports = {
  entry: ['./src/main.ts'],
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
