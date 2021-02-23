import AuthRoutes from "./authRoutes";
import UtilRoutes from "./utilRoutes";

import ContextStrategy from "../db/strategies/base/context/strategy";
import UserSchema from "../db/strategies/postgres/schemas/userSchema";
import PostgreSQL from "../db/strategies/postgres";

export default class Routes {
  constructor() {
    this.generateRoutes();
  }

  async _generateContext({ connection, schema }) {
    const model = await PostgreSQL.defineModel(connection, schema);
    const context = new ContextStrategy(new PostgreSQL(connection, model));

    return context;
  }

  async _mapRoutes({ db, Route, schema }) {
    let context;

    if (db && schema) {
      const connection = await db.connect();

      if (Array.isArray(schema)) {
        context = await Promise.all(
          schema.map(async (schemaUnit) =>
            this._generateContext({ connection, schema: schemaUnit }),
          ),
        );
      } else {
        const schemaUnit = await this._generateContext({ connection, schema });
        context = [schemaUnit];
      }
    }

    const instance = new Route(...context);
    const methods = Route.methods();

    return methods.map((method) => instance[method]());
  }

  async generateRoutes() {
    const userRoutes = await this._mapRoutes({
      db: PostgreSQL,
      Route: AuthRoutes,
      schema: UserSchema,
    });
    const utilRoutes = await this._mapRoutes({ Route: UtilRoutes });

    return [...userRoutes, ...utilRoutes];
  }
}
