const bcrypt = require("bcrypt-nodejs");

function genSalt() {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, (err, salt) => (err ? reject(err) : resolve(salt)));
  });
}

function hash(password, salt) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(
      password,
      salt,
      null,
      (err, hash) => (err ? reject(err) : resolve(hash))
    );
  });
}

function compare(data, encrypted) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(
      data,
      encrypted,
      (err, res) => (err ? reject(err) : resolve(re))
    );
  });
}

const Security = {
  async hashPassword(password) {
    try {
      const salt = await genSalt();
      return hash(password, salt);
    } catch (err) {
      console.error(err);
    }
  },

  async isPasswordValid(data, encrypted) {
    try {
      return await compare(data, encrypted);
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = Security;
