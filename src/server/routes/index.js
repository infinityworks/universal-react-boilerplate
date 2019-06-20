import { Router } from 'express';
import actionsRouter from './actions';
import reactRoutes from '../../client/routes/index';

const router = Router();

const clientRoutes = reactRoutes[0].routes.map(r => ({ ...r, method: 'get' }));

router.use('/', actionsRouter([...clientRoutes]));

export default router;
