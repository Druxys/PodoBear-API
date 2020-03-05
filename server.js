const http = require('http');
const app = require('./app');

const port = 5000;

const server = http.createServer(app);

let date = new Date(Date.now());

server.listen(port);