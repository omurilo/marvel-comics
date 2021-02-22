import { version } from "../package.json";

export default {
  info: {
    title: "Marvel Comics API - Stone Challenge",
    version,
    contact: {
      name: "Murilo Henrique",
      url: "https://omurilo.dev",
      email: "hi@omurilo.dev",
    },
  },
  documentationPath: "/docs",
  sortEndpoints: "ordered",
  schemes: ["http", "https"],
  security: [
    {
      jwt: [],
    },
  ],
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "authorization",
      in: "header",
    },
  },
};
