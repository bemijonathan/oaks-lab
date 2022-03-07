import express, { Request, Response } from "express"
import { config } from "dotenv";
import { initilizeDB } from "./src/db";
import { STATUS_CODES } from "./src/types/app";
import { routes } from "./src/api/v1/index.routes";

config()

export class App {
    public app: express.Application
    port: number | string

    constructor(port: number) {
        this.app = express();
        this.initializeMiddlewares();
        this.port = port;
        this.initializeDB();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port} ${process.env.NODE_ENV}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.set('trust proxy', true);
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        // this.app.use(requestLogger);
    }

    private initializeRoutes() {
        this.app.use('/api/v1/', routes());

        this.app.all('*', (req, res) => {
            return res.status(404).json({
                status: false,
                error: 'not_found',
                message: STATUS_CODES.NOT_FOUND,
                path: req.url,
                data: {}
            });
        });
    }


    private async initializeDB() {
        initilizeDB();
    }

    private initializeErrorHandling() {
        this.app.on('error', (error) => {
            console.log(error)
        });
    }

}