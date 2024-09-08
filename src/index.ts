import url from "url";
import path from "path";
import express from "express";
import db from "./models/index.ts";
import indexRouter from "./routes/index.ts";

/** Absolute path and filename of current module */
const __filename = url.fileURLToPath(import.meta.url);
/** Directory name of current module */
const __dirname = path.dirname(__filename);
/** Express application */
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// serve static files
app.use(express.static(path.join(__dirname, "public")));

// Base router
app.use("/api", indexRouter);

/** Server startup */
const init = async () => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    // Sync models to database
    await db.sequelize.sync();

    // Listen on specified port
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
