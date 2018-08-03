import bcrypt from 'bcrypt';

export default class Helper {
  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, savedPassword) {
    return bcrypt.compareSync(password, savedPassword);
  }

  static confirmUpdateDate(createdDate, currentDate) {
    return createdDate.toDateString() === currentDate.toDateString();
  }
}
