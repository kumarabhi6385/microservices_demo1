import http from "http";
import service from "../app.js";

const log = service.config.log;

const server = http.createServer(service);

server.listen(service.config.port || 3000);

server.on("listening", () => {
  log.info(
    `Hi there! I'm Micro services registry app and listening on port ${
      server.address().port
    } in ${service.get("env")} mode.`
  );
});
