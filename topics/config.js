import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import bunyan from "bunyan";
import formatter from "bunyan-format";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const formatOut = formatter({ color: true });

const log = bunyan.createLogger({
  name: "Topic Micorservice",
  stream: formatOut,
  level: process.env.LOG_LEVEL,
});

const packageFile = fs.readFileSync("package.json");

const config = {
  log,
  name: packageFile.name,
  version: packageFile.version,
  registrationURL: process.env.REGISTRATION_URL,
  mongodb_url: process.env.MONGO_URL,
  secret: process.env.secret,
};

export default config;
