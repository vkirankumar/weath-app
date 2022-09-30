const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const bodyParser = require("body-parser");
const PORT = 5001;

const http = require("http");

module.exports = start = () => {
    const app = getExpressApp(); 
    configueMiddleWare(app);
    configureRoutes(app);
    createServer(app);   
}

const getExpressApp = () => {
    const app = express();
    app.use(cors({ credentials: true, origin: true }));
    app.use(bodyParser.json({limit: "30mb", extended: true}));
    app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
    return app;
}

const configueMiddleWare = (app) => {
    console.log("Configure error handler middleware");
}

const configureRoutes = (app) => {
    app.use("/weath-app", router);
}

const createServer = (app) => {
    http.createServer(app).listen(PORT);
    console.log(`Server listening on PORT = ${PORT}`);
}