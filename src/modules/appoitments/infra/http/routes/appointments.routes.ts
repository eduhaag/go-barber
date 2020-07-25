import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import AppointmentsControllers from '../controllers/AppointmentsControllers';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsControllers();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsControllers.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
