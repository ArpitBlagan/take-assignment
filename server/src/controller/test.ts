import { Response, Request } from "express";
import { parse } from "csv-parse";
import fs from "fs";
export const uploadTest = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "no csv file found" });
  }
  try {
    let questions = [];
    fs.createReadStream(`./upload/${req.file.originalname}`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        console.log(row);
      })
      .on("end", function () {
        console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};
