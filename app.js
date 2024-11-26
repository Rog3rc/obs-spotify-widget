import express from "express";
import path from "path";
import CONFIG from "./setup.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(CONFIG().PORT, () => {
  console.log(`Server listening on port ${CONFIG().PORT}`);
});
