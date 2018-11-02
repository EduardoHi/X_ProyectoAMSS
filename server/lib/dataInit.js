const TodoAccess = require("../modules/todo/dataAccess/todo.access");
const UserAccess = require("../modules/user/dataAccess/user.access");
const DriverAccess = require("../modules/driver/dataAccess/driver.access");

TodoAccess.create({
  firstLabel: "Hello",
  secondLabel: "World"
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
