import express from "express";
import config from "../config.js";
import Logger from "../src/middleware/logger.js";
import topicRoute from "../src/topics/topicRoute.js";
import categoryRoute from "../src/category/categoryRoute.js";
import jwt from "jsonwebtoken";

const service = express();

// JWT setup
service.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.secret);
      if (decoded) {
        req.user = decoded;
        return next();
      } else {
        req.user = undefined;
        return next();
      }
    } catch (err) {
      req.user = undefined;
      return next();
    }
  } else {
    req.user = undefined;
    return next();
  }
});

service.use(express.json({ extended: true }));
service.use(express.urlencoded({ extended: true }));

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

export default service;
