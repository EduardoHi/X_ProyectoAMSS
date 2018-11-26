const Admin = require("./admin/admin.model");
const { User } = require("./user/user.model");
const Driver = require("./driver/driver.model");
const Trip = require("./trip/trip.model");

// DB Relationships
Trip.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Trip, { as: 'trips', foreignKey: 'userId' });

Trip.belongsTo(Driver, { as: 'driver', foreignKey: 'driverId' });
Driver.hasMany(Trip, { as: 'trips', foreignKey: 'driverId' });
