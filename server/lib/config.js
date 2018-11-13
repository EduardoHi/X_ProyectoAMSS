module.exports = {
  database: {
    name: "transpais",
    username: "root",
    password: "",
    host: "localhost"
  },
  dropAndCreate: true,
  jwt: {
    credentialsRequired: true,
    secret: "why-so-serioussss",
    usecurePaths: [
      "/api/auth-admin/",
      "/api/auth-user/",
      "/api/auth-driver/",
      "/api/driver/",
      "/api/user/"
    ]
  }
};
