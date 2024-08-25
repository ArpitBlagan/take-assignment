import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { router } from "./route";
dotenv.config();
const app = express();
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT || 9000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
