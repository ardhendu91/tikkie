import express, { Request, Response as ExpressResponse, NextFunction } from 'express';
import cls from 'express-http-context';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import Response from './common/response';
import mainrouter from './modules/mainrouter';

const app = express(); // Creating an Express application instance

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(cls.middleware);

app.use((req: Request, res: ExpressResponse, next: NextFunction) => {
    const lang = req.headers['accept-language'] ? req.headers['accept-language'] : 'en';
    console.log(JSON.stringify(req));
    const originalEnd = res.end;
    const requestId = uuidv4();
    const requestUrl = req.url;

    res.end = ((...args: any) => {
        try {
            console.log(`[END REQ] ${req.method}-${requestUrl} - duration: ${new Date().getTime() - cls.get('requestTime')} ms`);
            originalEnd.apply(res, args); // Call original end with proper context
        } catch (err) {
            console.error('Error in res.end override:', err);
            res.status(500).send('Internal Server Error');
        }
    }) as typeof res.end;

    cls.set('requestId', requestId);
    cls.set('language', lang);
    cls.set('requestTime', new Date().getTime());
    console.log(`[BEGIN REQ] ${req.method}-${req.url}`);
    next();
});

app.use(helmet());
app.use('/', mainrouter);

function errorHandler(err: any, req: Request, res: ExpressResponse, next: NextFunction) {
    console.error(`Error encountered : ${err.message}`);
    Response.create(err.message).setData(err.details).send(res, err.status || 500);
    next();
}

app.use(errorHandler);

export default app;