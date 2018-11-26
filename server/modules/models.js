const Admin = require("./admin/admin.model");
const { User } = require("./user/user.model");
const Driver = require("./driver/driver.model");
const Trip = require("./trip/trip.model");

// DB Relationships
Trip.belongsTo(User);
User.hasMany(Trip);

Trip.belongsTo(Driver);
Driver.hasMany(Trip);
