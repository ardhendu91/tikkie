"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
class Service {
    constructor() {
        this.expressApp = app_1.default; // Assign the Express application from app.ts
    }
}
exports.default = Service;
