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

UserAccess.createUser({
  name: "Jorge Iribe",
  email: "jorge@gmail.com",
  password: "password",
  phone: "6674499501"
});

UserAccess.createUser({
  name: "Eduardo Hi",
  email: "eduardo@gmail.com",
  password: "password",
  phone: "81166224404"
});

UserAccess.createUser({
  name: "Marifer Sanchez",
  email: "marifer@gmail.com",
  password: "password",
  phone: "8116849965"
});

DriverAccess.createDriver({
  name: "Pedro Picapiedras",
  email: "picapiedra@roca.com",
  password: "password",
  phone: "9991119990",
  taxiNumber: "666"
});

DriverAccess.createDriver({
  name: "Juana Iguana",
  email: "juana@gmail.com",
  password: "password",
  phone: "9991119990",
  taxiNumber: "999"
});

DriverAccess.createDriver({
  name: "Aaron Vazquez",
  email: "aaron@gmail.com",
  password: "password",
  phone: "9991119990",
  taxiNumber: "333"
});
