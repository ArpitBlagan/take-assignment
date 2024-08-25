import { NextFunction, Request, Router, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import {
  addReview,
  geTests,
  getReviews,
  getTest,
  testSubmission,
  uploadTest,
} from "./controller/test";
import {
  isLoggedIn,
  login,
  logout,
  register,
  uploadImage,
} from "./controller/user";
export const router = Router();
const upload = multer({ dest: "uploads/" });
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/upload").post(upload.single("file"), uploadImage);
router.use((req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET as string, (err: any, payload: any) => {
    if (err) {
      return res.status(400).json({ message: "token is inavlid" });
    }
    req.user = payload.user;
    next();
  });
});
router.route("/isloggedin").get(isLoggedIn);
router.route("/logout").get(logout);
router.route("/tests").get(geTests);
router.route("/test").get(getTest);
router.route("/uploadtest").post(upload.single("file"), uploadTest);
router.route("/postreview").post(addReview);
router.route("/getreviews").get(getReviews);
router.route("/gettest").get(getTest);
router.route("/submit").post(testSubmission);
