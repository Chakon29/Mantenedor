import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Persona = db.define('Persona', {
    rut: {
        type: DataTypes.STRING,
        primaryKey: true // Definir rut como clave primaria
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido:{
        type: DataTypes.STRING
    },
    sexo:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    fechaNacimiento:{
        type: DataTypes.DATE
    },
    email:{
        type: DataTypes.STRING
    }
},  {
    createdAt: false,
    updatedAt: false
}
);
export default Persona;
