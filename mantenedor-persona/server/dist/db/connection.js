"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('PersonaDb', 'admin', '12345678', {
    host: 'database-1.cbguqogoub8t.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false
});
exports.default = sequelize;
