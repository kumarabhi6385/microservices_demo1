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
  name: "User Management Micorservice",
  stream: formatOut,
  level: process.env.LOG_LEVEL,
});

const data = fs.readFileSync(path.resolve(__dirname, "./package.json"));
const applicationInfo = JSON.parse(data);

const config = {
  log,
  name: applicationInfo.name,
  version: applicationInfo.version,
  registrationURL: process.env.REGISTRATION_URL,
  mongodb_url: process.env.MONGO_URL,
  salt: process.env.salt,
  secret: process.env.secret,
  expiry: process.env.EXPIRY,
};

export default config;
