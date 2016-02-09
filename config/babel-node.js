var babelResolver = require('babel-resolver'),
    path = require('path');

module.exports = {
  ignore: /node_modules\/(?!@whastings\/js_utils)/,
  plugins: [
    'transform-decorators-legacy',
  ],
  presets: ['react', 'es2015-node5'],
  resolveModuleSource: babelResolver(path.resolve(__dirname, '../'))
};
