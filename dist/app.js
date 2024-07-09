"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const response_1 = __importDefault(require("./common/response"));
const mainrouter_1 = __importDefault(require("./modules/mainrouter"));
const app = (0, express_1.default)(); // Creating an Express application instance
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use(express_http_context_1.default.middleware);
app.use((req, res, next) => {
    const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
    console.log(JSON.stringify(req));
    const originalEnd = res.end;
    const requestId = (0, uuid_1.v4)();
    const requestUrl = req.url;
    res.end = ((...args) => {
        try {
            console.log(`[END REQ] ${req.method}-${requestUrl} - duration: ${new Date().getTime() - express_http_context_1.default.get('requestTime')} ms`);
            originalEnd.apply(res, args); // Call original end with proper context
        }
        catch (err) {
            console.error('Error in res.end override:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    express_http_context_1.default.set('requestId', requestId);
    express_http_context_1.default.set('language', lang);
    express_http_context_1.default.set('requestTime', new Date().getTime());
    console.log(`[BEGIN REQ] ${req.method}-${req.url}`);
    next();
});
app.use((0, helmet_1.default)());
app.use('/', mainrouter_1.default);
function errorHandler(err, req, res, next) {
    console.error(`Error encountered : ${err.message}`);
    response_1.default.create(err.message).setData(err.details).send(res, err.status || 500);
    next();
}
app.use(errorHandler);
exports.default = app;
