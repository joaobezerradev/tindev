import { Router } from 'express';
import DevController from './Controller/DevController';
import LikeController from './Controller/LikeController';
import DislikeController from './Controller/DislikeController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);

routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;
