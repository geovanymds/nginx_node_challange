import express, {Express, Request, Response, NextFunction} from "express";
import body_parser from "body-parser";
import path from "path";

export class App {
    express: Express;

    constructor() {
        this.express = express();
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

    this.express.use("/", (req: Request, res: Response) => {
        res.render("index.html");
    });

    this.express.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        const status = 500;
        const message = error.message;
        res.status(status).json({ message });
    });
    }
};