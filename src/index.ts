import url from "url";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import db from "./models/index.ts";
import indexRouter from "./routes/index.ts";

dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

const init = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
