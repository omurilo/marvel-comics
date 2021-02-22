import "./env";

export default {
  url: process.env.DB_URL,
  dialect: process.env.DB_DIALECT,
  quoteIdentifiers: false,
  logging: false,
  ssl: Boolean(JSON.parse(process.env.SSL_DB)),
  dialectOptions: {
    ssl: Boolean(JSON.parse(process.env.SSL_DB)),
  },
  define: {
    freezeTableName: false,
    timestamps: false,
  },
};
