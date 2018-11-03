module.exports = {
  database: {
    name: "transpais",
    username: "root",
    password: "",
    host: "localhost"
  },
  dropAndCreate: false,
  jwt: {
    credentialsRequired: true,
    secret: "why-so-serioussss",
    usecurePaths: ["/api/auth-user/", "/api/driver/", "/api/user/"]
  }
};
