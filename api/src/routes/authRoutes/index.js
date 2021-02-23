import Joi from "joi";
import Boom from "@hapi/boom";
import Jwt from "@commercial/jwt";

import BaseRoute from "../base/baseRoute";
import PasswordHelper from "../../helpers/PasswordHelper";

export default class AuthRoute extends BaseRoute {
  constructor(db, secret) {
    super();
    this.db = db;
    this.secret = secret;
  }

  auth() {
    const schema = Joi.object({
      username: Joi.string()
        .min(3)
        .required()
        .description("Username on Database"),
      password: Joi.string()
        .min(3)
        .required()
        .description("Password on Datebase"),
    });

    return {
      path: "/auth",
      method: "POST",
      options: {
        tags: ["api", "auth"],
        description: "Get token",
        notes: "SignIn with username and password",
        auth: false,
        validate: {
          failAction: (request, headers, error) => {
            throw error;
          },
          payload: schema,
        },
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        const {
          rows: [result],
        } = await this.db.index({
          username: username.toLowerCase(),
        });

        if (!result) {
          return Boom.unauthorized("User not found");
        }

        const match = await PasswordHelper.compareHash(
          password,
          result.password,
        );

        if (!match) {
          return Boom.unauthorized("User or password is invalid");
        }

        const token = Jwt.token.generate(
          {
            username,
            id: result.id,
          },
          this.secret,
          {},
        );

        return {
          token,
        };
      },
    };
  }
}
