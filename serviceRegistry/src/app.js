import express from "express";
import LoggerMiddleWare from "./middleware/logger.js";
import config from "../config.js";
import serviceRoute from "./serviceRoutes.js";

const service = express();

service.use(express.json());

service.config = config;

const middleware = new LoggerMiddleWare(config);

if (service.get("env") === "development") {
  service.use(middleware.logDevelopment);
}

serviceRoute(service);

service.use(middleware.errorHandler);

export default service;
