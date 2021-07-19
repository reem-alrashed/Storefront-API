import { User } from '../../src/models/User';
import {
  UserReturnType,
  UserCreatedReturnType
} from '../../src/interfaces/User';

const user: User = new User();

describe('User Model', () => {
  it('should have a getUsers  method', () => {
    expect(user.getUsers).toBeDefined();
  });

  it('should have a getUserById method', () => {
    expect(user.getUserById).toBeDefined();
  });

  it('should have a createUser method', () => {
    expect(user.createUser).toBeDefined();
  });
  it('should have a deleteUser method', () => {
    expect(user.deleteUser).toBeDefined();
  });

  it('should create a user with auth to true using createUser method', async () => {
    const result: UserCreatedReturnType = await user.createUser({
      firstName: 'kevin',
      lastName: 'eyong',
      password: 'thisismeenow2020#'
    });
    expect(result.auth).toEqual(true);
    expect(result.token).toBeDefined();
  });
});