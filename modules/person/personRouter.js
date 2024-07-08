"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personController_1 = __importDefault(require("./personController"));
const personRouter = (0, express_1.Router)();
personRouter.get('/trial', (req, res, next) => {
    personController_1.default.trial(req, res, next);
});
exports.default = personRouter;
