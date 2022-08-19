import express, {Express, Request, Response, NextFunction} from "express";
import { PrismaClient } from '@prisma/client'
import body_parser from "body-parser";
import path from "path";

export class App {
    express: Express;
    db_client: PrismaClient;

    constructor() {
        this.express = express();
        this.db_client = new PrismaClient();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.static(path.join(__dirname, "../public")));
        this.express.set("views", path.join(__dirname, "../public"));
        this.express.engine("html", require("ejs").renderFile);
        this.express.set("view engine", "html");
        this.express.use(body_parser.json());
    }

    routes() {

        this.express.use("/main", (req: Request, res: Response) => {
            res.render("index.html");
        });

        this.express.post("/users", async (req:Request, res: Response)=>{
            const { name } = req.body;
            console.log(req.body);
            await this.db_client.user.create({
                data: {
                    name: name
                }
            });
            const users = await this.db_client.user.findMany();
            return res.status(200).json(users);
        });

        this.express.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            console.log(error);
            const status = 500;
            const message = error.message;
            res.status(status).json({ message });
        });
    }
};