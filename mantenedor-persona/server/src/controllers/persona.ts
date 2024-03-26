import {Request, Response} from 'express'
import Persona from '../models/persona'

export const getPersonas = async (req: Request, res: Response) => {
    try {
        const distinctRuts = await Persona.aggregate('rut', 'DISTINCT', { plain: false }) as { DISTINCT: string }[];
        const uniquePersonas = await Promise.all(
            distinctRuts.map(async (rutObject) => {
                const uniquePersona = await Persona.findOne({ where: { rut: rutObject.DISTINCT } });
                return uniquePersona;
            })
        );
        const filteredPersonas = uniquePersonas.filter(persona => persona !== null); // Eliminar valores nulos
        res.json(filteredPersonas);
    } catch (error) {
        console.error("Error fetching personas:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPersona = async (req: Request, res: Response) => {
    const {id} = req.params;
    const persona = await Persona.findByPk(id)

    if(persona){
        res.json(persona)
    } else {
        res.status(404).json({
            msg: `No existe persona con el ${id}`
        });
    }
    
}

export const deletePersona = async (req: Request, res: Response) => {
    const {id} = req.params;
    const persona = await Persona.findByPk(id);
    
    if(!persona) {
        res.status(404).json({
            msg: `No existe persona con el id ${id}`
        })
    } else {
        await persona.destroy();
        res.json({
            msg: `Se ha eliminado la persona con el ${id} con exito`
        });
    }
}

export const postPersona = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        // Verificar si ya existe una persona con el mismo rut
        const existingPersona = await Persona.findOne({ where: { rut: body.rut } });
        if (existingPersona) {
            return res.status(400).json({ msg: "Ya existe una persona con este rut" });
        }

        // Si no existe, se crea la nueva persona
        await Persona.create(body);

        res.json({ msg: `Se ha agregado la persona con éxito` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `Ha ocurrido un error` });
    }
}
export const updatePersona = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const persona = await Persona.findByPk(id);
        if (persona) {
            // Comparar campos actuales con los nuevos campos
            let changesDetected = false;
            const updatedFields: { [key: string]: any } = {};
            Object.keys(body).forEach((key) => {
                if (persona.get(key) !== body[key]) {
                    changesDetected = true;
                    updatedFields[key] = body[key];
                }
            });

            if (changesDetected) {
                await persona.update(updatedFields);
                res.json({
                    msg: `Se ha actualizado los datos de la persona`
                });
            } else {
                res.json({
                    msg: `No se realizaron cambios en los datos de la persona ${id}`
                });
            }
        } else {
            res.status(404).json({
                msg: `No existe persona con el rut ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ha ocurrido un error`
        });
    }
};