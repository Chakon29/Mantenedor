import {DataTypes } from 'sequelize'
import db from '../db/connection';

const Usuario = db.define('Usuario',{
    usuario: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
});
export default Usuario;