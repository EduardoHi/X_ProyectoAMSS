const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Config = require("./config");

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
      (err, res) => (err ? reject(err) : resolve(res))
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
  },

  async signToken(user) {
    try {
      return jwt.sign({ id: user.id, email: user.email }, Config.jwt.secret);
    } catch (err) {}
  }
};

module.exports = Security;
