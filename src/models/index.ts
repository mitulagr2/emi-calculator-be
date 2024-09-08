import fs from "fs";
import url from "url";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";
import { creds } from "../config/config.ts";
import type { Database } from "../types/types.ts";

/** Absolute path and filename of current module */
const __filename = url.fileURLToPath(import.meta.url);
/** Directory name of current module */
const __dirname = path.dirname(__filename);
/** Filename of current module */
const basename = path.basename(__filename);
/** Current NODE environment */
const env = process.env.NODE_ENV || "development";
/** Current sequelize configuration */
const config = creds[env];

/** App sequelize instance */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/** App database instance */
const db: Database = { sequelize, Sequelize };

// Loop all files in /models directory
fs.readdirSync(__dirname)
  // Ignore current and non-typescript files
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  // Import file model and initialize its table
  .forEach((file) => {
    import(path.join(__dirname, file)).then(({ default: init }) => {
      const model = init(sequelize, DataTypes);
      db[model.name] = model;
    });
  });

// Apply model associations
Object.keys(db).forEach((modelName) => {
  //@ts-ignore
  if (db[modelName].associate) {
    //@ts-ignore
    db[modelName].associate(db);
  }
});

export default db;
