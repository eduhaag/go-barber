import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AutheticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AutheticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
