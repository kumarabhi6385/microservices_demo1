import http from "http";
import axios from "axios";
import service from "../app.js";
import mongoose from "mongoose";

const server = http.createServer(service);
const config = service.config;
const log = config.log;

mongoose
  .connect(config.mongodb_url)
  .then(() => {
    // Microservice should not run on specif port. it should choose port randomly.
    log.info("Connected to mongo db");
    server.listen(0);
  })
  .catch((err) => {
    log.info(`Failed to connect to Mongo DB : ${err}`);
  });

server.on("listening", () => {
  const registerService = () => {
    axios.put(
      `${config.registrationURL}/register/${config.name}/${config.version}/${
        server.address().port
      }`
    );
    log.info(
      `Register ${config.registrationURL}/register/${config.name}/${
        config.version
      }/${server.address().port}`
    );
  };
  const unregisterService = () => {
    axios.delete(
      `${config.registrationURL}/register/${config.name}/${config.version}/${
        server.address().port
      }`
    );
    log.info(
      `Unregister ${config.registrationURL}/register/${config.name}/${
        config.version
      }/${server.address().port}`
    );
  };
  registerService();

  const interval = setInterval(registerService, 20000);
  const cleanup = async () => {
    clearInterval(interval);
    await unregisterService();
  };

  process.on("uncaughtException", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await cleanup();
    process.exit(0);
  });

  log.info(
    `Hi there! I'm User Management service and listening on port ${
      server.address().port
    } in ${service.get("env")} mode.`
  );
});
