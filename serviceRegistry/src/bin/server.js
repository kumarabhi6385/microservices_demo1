import http from "http";
import service from "../app.js";

const log = service.config.log;

const server = http.createServer(service);

server.listen(process.env.PORT || 3000);

server.on("listening", () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${service.get(
      "env"
    )} mode.`
  );
});
