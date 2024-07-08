import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import personController from './personController';

const personRouter: Router = Router();

personRouter.get('/trial', (req: Request, res: Response, next: NextFunction) => {
  personController.trial(req, res, next);
});

export default personRouter;
