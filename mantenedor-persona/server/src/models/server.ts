import express, { Application,Request, Response } from 'express';
import routesPersona from '../routes/persona';
import routesUsuario from '../routes/usuario';
import db from '../db/connection';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Todo correcto en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                    msg: 'API Positiva'
                })
        })
        this.app.use('/api/personas', routesPersona)

        this.app.use('/api/usuario', routesUsuario)
    }
    midlewares(){
        this.app.use(express.json());
    }
    async dbConnect() {
        try {
            await db.authenticate();
            console.log('AWS RDS conectado')

        } catch (error){
            console.log(error);
            console.log('Error al intentar conectar AWS RDS')
        };

    }
}
export default Server;
