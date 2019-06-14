const path = require('path');

module.exports = {
  entry: {
    play: './src/scripts/index.js',
    home: './src/scripts/collection.js'
  },
  output: {
    filename: '[name]-main.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  }
};