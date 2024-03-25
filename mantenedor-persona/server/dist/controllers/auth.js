"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, password } = req.body;
    try {
        // Busca al usuario por su nombre de usuario en la base de datos
        const usuarioEncontrado = yield usuario_1.default.findOne({ where: { usuario } });
        // Si no se encuentra el usuario, responde con un error 404
        if (!usuarioEncontrado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Compara la contraseña proporcionada con el hash almacenado en la base de datos
        if (!bcrypt_1.default.compareSync(password, usuarioEncontrado.getDataValue('password'))) {
            // Si las contraseñas no coinciden, responde con un error 401
            return res.status(401).json({ msg: 'Credenciales inválidas' });
        }
        // Si las contraseñas coinciden, responde con un mensaje de éxito
        return res.json({ msg: 'Inicio de sesión exitoso' });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.login = login;
