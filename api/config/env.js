import { config } from "dotenv";
import { join } from "path";
import { ok } from "assert";

const env = process.env.NODE_ENV || "development";
ok(
  env === "production" || env === "development",
  "the environment it is invalid, only production or development its permited",
);

const configPath = join(__dirname, `.env.${env}`);
config({ path: configPath });
