import { NextFunction, Request, Router, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { uploadTest } from "./controller/test";
export const router = Router();
const upload = multer({ dest: "uploads/" });
router.route("/login").post();
router.route("/register").post();

router.use((req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.toke;
  jwt.verify(token, process.env.SECRET as string, (err: any, payload: any) => {
    if (err) {
      return res.status(400).json({ message: "token is inavlid" });
    }
    req.user = payload.user;
    next();
  });
});

router.route("/tests").get();
router.route("/upload").post(upload.single("file"), uploadTest);
