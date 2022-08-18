import { App } from "./app";

new App().express.listen(process.env.APP_PORT, ()=>{
    console.log(`Listening on port ${process.env.APP_PORT}`);
});