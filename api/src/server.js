import Hapi from "@hapi/hapi";
import Sentry from "hapi-sentry";
import Swagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiJwt from "hapi-auth-jwt2";

import Routes from "./routes";
import SentryConfig from "../config/sentry";
import SwaggerConfig from "../config/swagger";

const ContextStrategy = require("./db/strategies/base/context/strategy");
const PostgreSQL = require("./db/strategies/postgres");
const UserSchema = require("./db/strategies/postgres/schemas/userSchema");

class App {
  constructor() {
    this.app = new Hapi.Server({
      port: process.env.PORT,
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    this.app.register([Inert, HapiJwt, Vision, this.sentry(), this.swagger()]);
  }

  swagger() {
    return {
      plugin: Swagger,
      options: SwaggerConfig,
    };
  }

  sentry() {
    return {
      plugin: Sentry,
      options: {
        client: { dsn: SentryConfig.dsn },
      },
    };
  }

  async auth() {
    const connectionPostgres = await PostgreSQL.connect();
    const model = await PostgreSQL.defineModel(connectionPostgres, UserSchema);
    const contextPostgres = new ContextStrategy(
      new PostgreSQL(connectionPostgres, model),
    );

    this.app.auth.strategy("jwt", "jwt", {
      key: process.env.JWT_SECRET,
      validate: async (data) => {
        const [user] = await contextPostgres.index({
          username: data.username.toLowerCase(),
          id: data.id,
        });

        if (!user) {
          return {
            isValid: false,
          };
        }

        return {
          isValid: true,
        };
      },
    });

    this.app.auth.default("jwt");
  }

  async routes() {
    const routes = new Routes();
    const routesArray = await routes.generateRoutes();
    this.app.route(routesArray);
  }

  async run() {
    await this.app.start();
    console.log(`Aplicação rodando na porta ${process.env.PORT}`);
  }
}

export default App;
