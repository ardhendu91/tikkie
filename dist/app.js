"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express')(); // Importing the Express module and creating an Express application instance
const cls = require('express-http-context'); //maintain state across asynchronous operation
const cors = require('cors'); //handles requests from multiple origins
const { v4: uuidv4 } = require('uuid');
const helmet = require('helmet'); //help secure express apps by including various headers
const response = require('./common/response');
const bodyParser = require('body-parser');
const mainrouter_1 = __importDefault(require("./modules/mainrouter"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(cls.middleware);
app.use((req, res, next) => {
    const lang = req.headers['Accept-Language'] ? req.headers['Accept-Language'] : 'en';
    const Originalend = res.end;
    const requestId = uuidv4;
    const requestUrl = req.url;
    res.end = function requestEndOverride(...args) {
        console.log(`[END REQ] ${this.req.method}-${requestUrl} - duration: ${new Date().getTime() - cls.get('requestTime')} ms`);
        Originalend.apply(this, args);
    };
    cls.set('requestId', requestId);
    cls.set('language', lang);
    cls.set('requestTime', new Date().getTime());
    console.log(`[BEGIN REQ] ${req.method}-${req.url}`);
    next();
});
app.use(helmet());
app.use('/', mainrouter_1.default);
function errorHandler(err, req, res, next) {
    console.error(`Error encountered : ${err.message}`);
    response.create(err.message).setData(err.details).send(res, err.status || 500);
    next();
}
app.use(errorHandler);
exports.default = app;
