import express from "express";
import config from "../config.js";
import Logger from "../src/middleware/logger.js";
import topicRoute from "../src/topics/topicRoute.js";
import categoryRoute from "../src/category/categoryRoute.js";

const service = express();

service.use(express.json());

service.config = config;
const logger = new Logger(config);

if (service.get("env") === "development") {
  service.use(logger.logDevelopment);
}

// Module registration
topicRoute(service);
categoryRoute(service);

// Global error handler
service.use(logger.errorHandler);

service.use(express.json());

export default service;
