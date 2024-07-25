import express from "express";
import cors from "cors";
import { announcementRouter, applyRouter } from "./routers/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).send("Something broke!");
});

app.use("/announcement", announcementRouter);
app.use("/apply", applyRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
