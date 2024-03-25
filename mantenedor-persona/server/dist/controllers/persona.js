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
exports.updatePersona = exports.postPersona = exports.deletePersona = exports.getPersona = exports.getPersonas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersona = yield persona_1.default.findAll({});
    res.json(listPersona);
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield persona_1.default.findByPk(id);
    if (persona) {
        res.json(persona);
    }
    else {
        res.status(404).json({
            msg: `No existe persona con el ${id}`
        });
    }
});
exports.getPersona = getPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield persona_1.default.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: `No existe persona con el id ${id}`
        });
    }
    else {
        yield persona.destroy();
        res.json({
            msg: `Se ha eliminado la persona con el ${id} con exito`
        });
    }
});
exports.deletePersona = deletePersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield persona_1.default.create(body);
        res.json({
            msg: `Se ha agregado la persona con exito`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ha ocurrido un error`
        });
    }
});
exports.postPersona = postPersona;
const updatePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const persona = yield persona_1.default;
        if (persona) {
            yield persona.update(body);
            res.json({
                msg: `Se ha actualizado los datos de la persona ${id}`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe persona con el rut ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ha ocurrido un error`
        });
    }
});
exports.updatePersona = updatePersona;
