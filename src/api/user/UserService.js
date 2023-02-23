import UserNotFoundError from '../../errors/user/UserNotFoundError';

export default class UserService {
  constructor(models) {
    this._User = models.User;
  }

  getAllUsers() {
    return this._User.findAll({ attributes: { exclude: ['password'] } });
  }

  async getUserById(id) {
    const user = await this._User.findUserById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async getUserByUsername(username) {
    const user = await this._User.findUserByUsername(username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
