import fs from "fs";
import url from "url";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";
import { creds } from "../config/config.ts";
import type { Database } from "../types/types.ts";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = creds[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db: Database = { sequelize, Sequelize };

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    import(path.join(__dirname, file)).then(({ default: init }) => {
      const model = init(sequelize, DataTypes);
      db[model.name] = model;
    });
  });

Object.keys(db).forEach((modelName) => {
  //@ts-ignore
  if (db[modelName].associate) {
    //@ts-ignore
    db[modelName].associate(db);
  }
});

export default db;
