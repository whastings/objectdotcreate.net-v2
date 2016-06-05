module.exports = {
  plugins: [
    'check-es2015-constants',
    'transform-es2015-block-scoped-functions',
    'transform-es2015-block-scoping',
    'transform-es2015-classes',
    'transform-es2015-destructuring',
    'transform-es2015-literals',
    'transform-es2015-object-super',
    'transform-es2015-parameters',
    'transform-es2015-sticky-regex',
    'transform-es2015-typeof-symbol',
    'transform-es2015-unicode-regex',
    'transform-object-rest-spread',
    ['transform-runtime', {polyfill: false, regenerator: false}]
  ],
  presets: ['react']
};
