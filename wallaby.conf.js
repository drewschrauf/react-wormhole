/* eslint global-require:0 */
module.exports = wallaby => ({
  files: ['src/**/*.js'],
  tests: ['test/**/*.js'],
  env: {
    type: 'node',
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel(),
  },
  setup: () => {
    require('jsdom-global')();
  },
});
