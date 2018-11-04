const TodoAccess = require("../modules/todo/dataAccess/todo.access");
const AdminAccess = require("../modules/admin/dataAccess/admin.access");
const UserAccess = require("../modules/user/dataAccess/user.access");
const DriverAccess = require("../modules/driver/dataAccess/driver.access");

TodoAccess.create({
  firstLabel: "Hello",
  secondLabel: "World"
});

AdminAccess.createAdmin({
  name: "Admin",
  email: "admin",
  password: "admin",
  phone: "1234567890"
});

UserAccess.createUser({
  name: "Fernando Salazar",
  email: "fslzrr@gmail.com",
  password: "password",
  phone: "6671321009"
});

DriverAccess.createDriver({
  name: "Pedro Picapiedras",
  email: "picapiedra@roca.com",
  password: "password",
  phone: "9991119990",
  taxiNumber: "666"
});
