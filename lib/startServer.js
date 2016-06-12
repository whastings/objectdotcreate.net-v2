require('./initEnv')();
const path = require('path');
const ServerManager = require('../server').default;

const DIST_DIR = path.join(process.cwd(), 'dist');
const PORT = 8000;

let serverManager = new ServerManager({staticDir: DIST_DIR});
serverManager.startServer(PORT);

process.on('SIGTERM', () => serverManager.stopServer(() => process.exit()));
// For nodemon:
process.on('SIGUSR2', () => serverManager.stopServer(() => process.kill(process.pid, 'SIGUSR2')));