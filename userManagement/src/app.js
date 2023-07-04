import express from "express";
import config from "../config.js";
import Logger from "../src/middleware/logger.js";
import userRoute from "../src/userRoute.js";

const service = express();

service.use(express.json());

service.config = config;
const logger = new Logger(config);

if (service.get("env") === "development") {
  service.use(logger.logDevelopment);
}

// Module registration
userRoute(service);

// Global error handler
service.use(logger.errorHandler);

service.use(express.json());

export default service;
