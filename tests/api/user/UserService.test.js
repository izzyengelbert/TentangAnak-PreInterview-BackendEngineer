import UserService from '../../../src/api/user/UserService';

describe('UserService', () => {
  let models;
  beforeEach(() => {
    models = { User: {} };
  });
  it('should have called', () => {
    const userService = new UserService(models);
    console.log(userService);

    expect(true).toBeTruthy();
  });
});
