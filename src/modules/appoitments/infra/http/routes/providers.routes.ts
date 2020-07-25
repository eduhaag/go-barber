import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  dayAvailabilityController.index,
);

export default providersRouter;
