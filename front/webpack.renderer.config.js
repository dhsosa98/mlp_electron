// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./webpack.rules');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins');
const path = require('path');

rules.push({
    test: /\.css$/i,
    include: path.resolve(__dirname, 'src'),
    use: ['style-loader', 'css-loader', 'postcss-loader'],
});

module.exports = {
  target: 'electron-renderer',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      "path": require.resolve("path-browserify") //npm i path-browserify
    }
  }
};