/* Imports */

const http = require('http');  
const app = require('./app');  
const dotenv = require('dotenv').config({path : "./config/.env"}); 

/* normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un nombre ou d'une chaîne */

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);

const server = http.createServer(app); 

server.listen(port);



