import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionControllers from '../controllers/SessionControllers';

const sessionController = new SessionControllers();

const sessionsRouter = Router();
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
