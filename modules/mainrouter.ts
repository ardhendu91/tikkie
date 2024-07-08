import { Router } from 'express';
import personRouter from './person/personRouter';

const router: Router = Router();

router.use('/', personRouter);

export default router;
