import {Request, Response} from 'express'

export const getUsuarios = (req: Request, res: Response) => {
    res.json({
        msg: 'get Usuarios'
    })
}