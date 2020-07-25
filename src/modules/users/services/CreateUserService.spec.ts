import AppError from '@shared/error/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should  not be able to create a new with a existent email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
