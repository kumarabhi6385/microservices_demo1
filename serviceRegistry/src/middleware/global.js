class GlobalHandler {
  constructor(config) {
    this.log = config.log;
  }

  logDevelopment = (req, res, next) => {
    config.log.debug(`${req.method}: ${req.url}`);
    return next();
  };

  errorHandler = (err, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  };
}

export default GlobalHandler;
