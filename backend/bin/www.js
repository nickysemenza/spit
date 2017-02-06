#!/usr/bin/env node
let app = require('../app');
let http = require('http');
const WebSocket = require('ws');
let mongoose = require('mongoose');
let config = require('../config');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || config.BACKEND_PORT);
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);


mongoose.connect(config.MONGO_DB);


  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => {
    console.log(`Express server listening on port ${server.address().port}`);
  });
  server.on('error', onError);
  server.on('listening', onListening);


  let wss = new WebSocket.Server({server: server, path: '/', clientTracking: true, maxPayload: 1024, port: config.SOCKET_PORT});

  let s = require('./sock.js');
  let Client = require('./Client').Client;
  let Game = require('./Game').Game;
  let g = new Game("test");
  s.test1();
  wss.on('connection', (ws) => {
    let c = new Client(ws);
    s.clients.push(c);
    ws.on('message', (message) => {
      console.log('received: %s', message);
      console.log('from ' + c.name);
      c.processMessage(message);
    });

    ws.send('server says hi');
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
