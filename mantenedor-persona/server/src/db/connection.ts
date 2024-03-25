import { Sequelize } from "sequelize";

const sequelize = new Sequelize('PersonaDb','admin', '12345678',{
    host: 'database-1.cbguqogoub8t.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false

});

export default sequelize;