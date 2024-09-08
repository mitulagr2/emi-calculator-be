import type { Dialect } from "sequelize";

interface cred {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

export const creds: { [x: string]: cred } = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres_password",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOSTNAME || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres_password",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOSTNAME || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres_password",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOSTNAME || "localhost",
    dialect: "postgres",
  },
};
