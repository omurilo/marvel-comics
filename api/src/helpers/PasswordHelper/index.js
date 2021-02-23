import Bcrypt from "bcrypt";

const SALT = parseInt(process.env.BCRYPT_SALT, 10);

class PasswordHelper {
  static generateHash(password) {
    return Bcrypt.hash(password, SALT);
  }

  static async compareHash(password, hash) {
    return Bcrypt.compare(password, hash);
  }
}

module.exports = PasswordHelper;
