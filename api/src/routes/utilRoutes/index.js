import { join } from "path";

import BaseRoute from "../base/baseRoute";

export default class UtilRoutes extends BaseRoute {
  coverage() {
    return {
      path: "/coverage/{param*}",
      method: "GET",
      options: {
        auth: false,
      },
      handler: {
        directory: {
          path: join(__dirname, "..", "..", "..", "coverage"),
          redirectToSlash: true,
          listing: true,
        },
      },
    };
  }
}
