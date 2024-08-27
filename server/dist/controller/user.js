"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.register = exports.login = exports.logout = exports.uploadImage = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const razorpayInstance = new Razorpay({
//   key_id: "",
//   key_secret: "",
// });
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});
const uploadToS3 = (file, name) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${name}`,
        Body: file,
        ContentType: ["image/jpg", "image/png", "image/svg"],
    };
    const command = new client_s3_1.PutObjectCommand(params);
    try {
        const response = yield s3Client.send(command);
        console.log("File uploaded successfully:", response);
        return response;
    }
    catch (error) {
        throw error;
    }
});
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        try {
            const compressedImage = yield (0, sharp_1.default)(req.file.path)
                .resize(800)
                .toFormat("jpg", { quality: 80 })
                .toBuffer();
            yield uploadToS3(compressedImage, req.file.filename);
            const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
            console.log(imageUrl);
            fs_1.default.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "something went wrong:(" });
                }
            });
            return res.status(200).json(imageUrl);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "something went wrong:(" });
        }
    }
    return res.status(400).json({ message: "file not found :(" });
});
exports.uploadImage = uploadImage;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", { sameSite: "none", httpOnly: true, secure: true });
    res.status(200).json({ message: "logged out successfully" });
});
exports.logout = logout;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield __1.prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            return res
                .status(404)
                .json({ message: "user with this email not found" });
        }
        //@ts-ignore
        const pass = user.password;
        if (yield bcryptjs_1.default.compare(password, pass)) {
            const token = jsonwebtoken_1.default.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    profileImage: user.profileImage,
                },
            }, process.env.SECRET);
            res.cookie("token", token, {
                sameSite: "none",
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
            });
        }
        else {
            res.status(401).json({ message: "wrong email and password pair" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profileImage } = req.body;
    try {
        const user = yield __1.prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            const pass = yield bcryptjs_1.default.hash(password, 10);
            const val = yield __1.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: pass,
                    profileImage: profileImage,
                },
            });
            return res.status(202).json({ user: val });
        }
        else {
            return res.status(409).json({ message: "email already registered" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.register = register;
const isLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
    });
});
exports.isLoggedIn = isLoggedIn;
// export const createOrder = async (req: Request, res: Response) => {
//   const { amount } = req.body;
//   const order = await razorpayInstance.orders.create({
//     amount: amount * 100,
//     currency: "INR",
//   });
// };
// export const paymentDone = async (req: Request, res: Response) => {};
