import config from "../../config.js";

const log = config.logger;

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    log.warn(`Failed attempt to access url:${req.originalUrl}`);
    res.status(401).send("Unauthorized");
  }
};
