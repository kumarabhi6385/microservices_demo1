import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import bunyan from "bunyan";
import formatter from "bunyan-format";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const formatOut = formatter({ color: true });

const log = bunyan.createLogger({
  name: "Microservice_Registration",
  stream: formatOut,
  level: process.env.LOG_LEVEL,
});

const config = {
  port: 3000,
  log,
};

export default config;
