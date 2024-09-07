import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/ping", (_req, res) => {
  res.send("Pong!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
