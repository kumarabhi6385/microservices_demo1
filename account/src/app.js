import express from "express";
import config from "../config.js";
import Logger from "../src/middleware/logger.js";
import userRoute from "../src/userRoute.js";

const service = express();

service.use(express.json({ extended: true }));
service.use(express.urlencoded({ extended: true }));

const logger = new Logger(config);
service.config = config;

if (service.get("env") === "development") {
  service.use(logger.logDevelopment);
}

// Module registration
userRoute(service);

// Global error handler
service.use(logger.errorHandler);

export default service;
