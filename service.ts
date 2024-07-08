import express, { Application } from 'express';
import app from './app';

class Service {
    expressApp: Application;
    
    constructor() {
        this.expressApp = app; // Assign the Express application from app.ts
    }
}

export default Service;
