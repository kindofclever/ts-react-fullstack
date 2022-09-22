"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const puppyRoutes_1 = __importDefault(require("./routes/puppyRoutes"));
const favItemsRoutes_1 = __importDefault(require("./routes/favItemsRoutes"));
const app = (0, express_1.default)();
// Connect to mongoose
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    logging_1.default.info('--------- Connected to MongoDB ---------');
    startServer();
})
    .catch(error => {
    logging_1.default.error('!!!!!!!! Unable to connect to MongoDB !!!!!!!!');
    logging_1.default.error(error);
});
// Start server when connected to MongoDB, otherwise exit
const startServer = () => {
    // Middleware 
    app.use((req, res, next) => {
        // Log the request
        logging_1.default.info(`Incoming -> Method: [${req.method}] --- Url: [${req.url}] --- IP: [${req.socket.remoteAddress}]`);
        // Log the response
        logging_1.default.info(`Response -> Status: [${res.statusCode}]`);
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // Rules for the API
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://main.d3mfuxjxgnbn1p.amplifyapp.com/, https://main.d3mfuxjxgnbn1p.amplifyapp.com/:puppyId');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    app.use('/api/puppies', puppyRoutes_1.default);
    app.use('/api/favitems', favItemsRoutes_1.default);
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '/Users/Sache/Desktop/ts-react-fullstack/client/build/', 'index.html'));
    });
    // Healthcheck
    app.get('/healthcheck', (req, res, next) => res.status(200).json({ message: 'I am healthy!' }));
    // Errorhandler
    app.use((req, res, next) => {
        const error = new Error('Not found!');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    //Finally create the server
    http_1.default.createServer(app).listen(config_1.config.server.port, () => logging_1.default.info(`-------- Server is listening on port: [${config_1.config.server.port}] --------`));
};
// comment for git...
module.exports = app;
