import express from "express";
import dotenv from "dotenv";
import { router } from "./route";
dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT || 9000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
