var babelConfig = require('./config/babel-node'),
    path = require('path');

// Process all further dependencies through Babel.
require('babel-core/register')(babelConfig);

var command = process.argv[2] || 'start';

if (command === 'start') {
  require('./start');
} else if (command === 'repl') {
  require('./lib/repl');
} else {
  console.log('Command not supported.');
}
