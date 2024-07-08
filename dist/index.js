"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const service_1 = __importDefault(require("./service"));
const service = new service_1.default();
service.expressApp.listen(8001, () => {
    console.log('Server ready at http://localhost:8001/');
});
