import Hapi from "@hapi/hapi";
import Sentry from "hapi-sentry";
import Swagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiJwt from "hapi-auth-jwt2";

import SentryConfig from "../config/sentry";
import SwaggerConfig from "../config/swagger";

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

  async run() {
    await this.app.start();
    console.log(`Aplicação rodando na porta ${process.env.PORT}`);
  }
}

export default App;
