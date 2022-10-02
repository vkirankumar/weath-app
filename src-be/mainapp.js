import express from "express";
import cors from "cors";
import router from "./router/router.js";
import pkg from "body-parser";

const PORT = 5001;
const { json, urlencoded } = pkg;

import { createServer as _createServer } from "http";

export const start = () => {
    const app = getExpressApp(); 
    configueMiddleWare(app);
    configureRoutes(app);
    createServer(app);   
}

const getExpressApp = () => {
    const app = express();
    app.use(cors({ credentials: true, origin: true }));
    app.use(json({limit: "30mb", extended: true}));
    app.use(urlencoded({limit: "30mb", extended: true}));
    return app;
}

const configueMiddleWare = (app) => {
    console.log("Configure error handler middleware");
}

const configureRoutes = (app) => {
    app.use("/weath-app", router);
}

const createServer = (app) => {
    _createServer(app).listen(PORT);
    console.log(`Server listening on PORT = ${PORT}`);
}