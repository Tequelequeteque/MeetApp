import { Router } from 'express';

import authMiddleware from './app/middlewares/auth.middleware';

import UserController from './app/controllers/User.controller';
import SessionController from './app/controllers/Session.controller';
import FileController from './app/controllers/File.controller';
import MeetupController from './app/controllers/Meetup.controller';
import SubscriptionController from './app/controllers/Subscription.controller';
import OrganizingController from './app/controllers/Organizing.controller';

const routes = Router();

routes.use('/', UserController);
routes.use('/', SessionController);

routes.use('/', authMiddleware, FileController);
routes.use('/', authMiddleware, MeetupController);
routes.use('/', authMiddleware, SubscriptionController);
routes.use('/', authMiddleware, OrganizingController);

export default routes;
