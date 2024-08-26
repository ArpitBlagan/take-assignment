"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const test_1 = require("./controller/test");
const user_1 = require("./controller/user");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.router.route("/login").post(user_1.login);
exports.router.route("/register").post(user_1.register);
exports.router.route("/upload").post(upload.single("file"), user_1.uploadImage);
exports.router.use((req, res, next) => {
    const token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, payload) => {
        if (err) {
            return res.status(400).json({ message: "token is inavlid" });
        }
        req.user = payload.user;
        next();
    });
});
exports.router.route("/isloggedin").get(user_1.isLoggedIn);
exports.router.route("/logout").get(user_1.logout);
exports.router.route("/tests").get(test_1.geTests);
exports.router.route("/test").get(test_1.getTest);
exports.router.route("/uploadtest").post(upload.single("file"), test_1.uploadTest);
exports.router.route("/postreview").post(test_1.addReview);
exports.router.route("/getreviews").get(test_1.getReviews);
exports.router.route("/gettest").get(test_1.getTest);
exports.router.route("/submit").post(test_1.testSubmission).get(test_1.getSubmissions);
