import { Router } from 'express';
import actionRoutes from './actionsRoutes';
import actionsRouter from './actions';
import reactRoutes from '../../client/routes/index';

const router = Router();

const clientRoutes = reactRoutes[0].routes.map(r => ({ ...r, method: 'get' }));
const serverRoutes = actionRoutes;


router.use('/', actionsRouter([...clientRoutes, ...serverRoutes]));

export default router;
