import type { DBCredential } from "../types/types.ts";

export const creds: { [x: string]: DBCredential } = {
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
