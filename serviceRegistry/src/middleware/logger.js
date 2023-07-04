class LoggerMiddleWare {
  constructor(config) {
    this.log = config.log;
  }

  logDevelopment = (req, res, next) => {
    this.log.debug(`${req.method}: ${req.url}`);
    return next();
  };

  errorHandler = (err, req, res, next) => {
    // Log out the error to the console
    this.log.error(err);
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  };
}

export default LoggerMiddleWare;
