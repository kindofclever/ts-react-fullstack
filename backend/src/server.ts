import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import puppyRoutes from './routes/puppyRoutes';
import favItemsRoutes from './routes/favItemsRoutes';
import cors from 'cors';

const app = express();

// Cors
const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Connect to mongoose
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info('--------- Connected to MongoDB ---------');
    startServer();
  })
  .catch(error => {
      Logging.error('!!!!!!!! Unable to connect to MongoDB !!!!!!!!'); 
      Logging.error(error)
  });

// Start server when connected to MongoDB, otherwise exit
const startServer = () => { 
  // Middleware 
  app.use((req, res, next) => {
    // Log the request
    Logging.info(`Incoming -> Method: [${req.method}] --- Url: [${req.url}] --- IP: [${req.socket.remoteAddress}]`);
    // Log the response
    Logging.info(`Response -> Status: [${res.statusCode}]`);
    next();
  })
  app.use(cors(options));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
    // Rules for the API
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'Options') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({})
    }
    next();
  });
  
  // Routes
  app.use('/api/puppies', puppyRoutes);
  app.use('/api/favitems', favItemsRoutes);
  
  // Healthcheck
  app.get('/healthcheck', (req, res, next) => res.status(200).json({message: 'I am healthy!'}));

  // Errorhandler
  app.use((req, res, next) => {
    const error = new Error ('Not found!');
    Logging.error(error);
    return res.status(404).json({message: error.message});
  })

  //Finally create the server
  http.createServer(app).listen(config.server.port, () => Logging.info(`-------- Server is listening on port: [${config.server.port}] --------`));
};
// comment for git...

module.exports = app;