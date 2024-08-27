import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import fs from "fs";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
// const razorpayInstance = new Razorpay({
//   key_id: "",
//   key_secret: "",
// });
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
});
const uploadToS3 = async (file: any, name: any) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${name}`,
    Body: file,
    ContentType: ["image/jpg", "image/png", "image/svg"],
  };

  const command = new PutObjectCommand(params as any);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const uploadImage = async (req: Request, res: Response) => {
  if (req.file) {
    try {
      const compressedImage = await sharp(req.file.path)
        .resize(800)
        .toFormat("jpg", { quality: 80 })
        .toBuffer();
      await uploadToS3(compressedImage, req.file.filename);
      const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
      console.log(imageUrl);
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "something went wrong:(" });
        }
      });
      return res.status(200).json(imageUrl);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "something went wrong:(" });
    }
  }
  return res.status(400).json({ message: "file not found :(" });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", { sameSite: "none", httpOnly: true, secure: true });
  res.status(200).json({ message: "logged out successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user with this email not found" });
    }
    //@ts-ignore
    const pass: string = user.password;
    if (await bcrypt.compare(password, pass)) {
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
          },
        },
        process.env.SECRET as string
      );
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
    } else {
      res.status(401).json({ message: "wrong email and password pair" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, profileImage } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      const pass = await bcrypt.hash(password, 10);
      const val = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: pass,
          profileImage: profileImage,
        },
      });
      return res.status(202).json({ user: val });
    } else {
      return res.status(409).json({ message: "email already registered" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const isLoggedIn = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
  });
};

// export const createOrder = async (req: Request, res: Response) => {
//   const { amount } = req.body;
//   const order = await razorpayInstance.orders.create({
//     amount: amount * 100,
//     currency: "INR",
//   });
// };

// export const paymentDone = async (req: Request, res: Response) => {};
