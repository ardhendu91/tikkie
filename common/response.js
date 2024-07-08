"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_http_context_1 = __importDefault(require("express-http-context"));
class Response {
    constructor(msg) {
        this.requestId = express_http_context_1.default.get('requestId');
        this.message = msg;
    }
    static create(msg) {
        return new Response(msg);
    }
    setData(data) {
        this.data = data;
        return this;
    }
    send(res, status) {
        res.status(status || 200).json(this);
    }
}
exports.default = Response;
