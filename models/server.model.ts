import express, { Application } from 'express';
import cors from 'cors';
import DbConnection from '../db/connection';
import { GlobalRoutes } from '../GlobalRoutes';
import ProductsRouter from '../routes/products.routes';

export default class ServerModel {

    private app: Application;
    private port: string;
    private paths = {
        products: '/api/products',
    };

    constructor() {
        this.app = express();
        this.port = GlobalRoutes.PORT || '80';
        //Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection() {

        try {
            await DbConnection.authenticate();
            console.log(`Conexión a BD establecida. HOST-> ${GlobalRoutes.DB_HOST}`)
        } catch (error: any) {
            throw Error(error)
        }
    }



    middlewares() {
        //cors
        this.app.use(cors());
        //parseo de la información
        this.app.use(express.json());
        //Contenido estático
        this.app.use(express.static('./public'));
    }

    routes() {
        this.app.use(this.paths.products, ProductsRouter);
    }

    listen() {
        const port = this.port;
       this.app.listen(port, () => {
            console.log(`Server running in port: ${port}`);
        });

    }
}