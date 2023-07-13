import { Router, Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    } else {
      return response.status(400).json({ error: 'Unexpected error' });
    }
  }
});

export default usersRouter;
