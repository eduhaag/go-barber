import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/uploads';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

import UsersControllers from '../controllers/UsersControllers';
import UsersAvatarControllers from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersControllers();
const usersAvatarController = new UsersAvatarControllers();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
