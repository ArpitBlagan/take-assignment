import { Response, Request } from "express";
import { parse } from "csv-parse";
import fs from "fs";
import { prisma } from "..";
export const uploadTest = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "no csv file found" });
  }
  console.log(req.file);
  const { title, description, topic, difficulty } = req.body;
  console.log(difficulty);
  try {
    let questions: any[] = [];
    fs.createReadStream(req.file.path)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        questions.push({
          problemStatement: row[0],
          correctOption: row[1],
          options: [row[2], row[3], row[4], row[5]],
        });
      })
      .on("end", async function () {
        console.log("finished");
        //@ts-ignore
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "something went wrong:(" });
          }
        });
        console.log(questions);
        const test = await prisma.test.create({
          data: {
            title,
            description,
            topic,
            difficulty,
            userId: req.user.id,
            questionCount: questions.length,
            price: 100,
          },
        });
        const ff = questions.map(async (ele) => {
          return prisma.question.create({
            data: {
              testId: test.id,
              problemStatement: ele.problemStatement,
              correctOption: ele.correctOption,
              option: ele.options,
            },
          });
        });
        await Promise.all(ff);
        res.status(200).json({ message: "successfully uploaded:(" });
      })
      .on("error", function (error) {
        console.log(error.message);
        //@ts-ignore
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "something went wrong:(" });
          }
        });
      });
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};

export const geTests = async (req: Request, res: Response) => {
  const { page } = req.query;
  const limit = 12;
  let skip = Number(page) * 12;
  try {
    const tests = await prisma.test.findMany({
      skip,
      take: limit,
      include: { Submission: true, user: true },
    });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};

export const getTest = async (req: Request, res: Response) => {
  const { testId } = req.query;
  if (!testId) {
    return res.status(400).json({ message: "missing some query parameters:(" });
  }
  try {
    const test = await prisma.test.findFirst({
      where: { id: testId as string },
      include: { questions: true, user: true, purchasers: true, review: true },
    });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { text, testId } = req.body;
  try {
    await prisma.review.create({
      data: {
        comment: text,
        testId,
        userId: req.user.id,
      },
    });
    res.status(202).json({ message: "Review added successfully:)" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  const { page, testId } = req.query;
  if (!testId || !page) {
    return res.status(400).json({ message: "missing some query parameters:(" });
  }
  const limit = 12;
  let skip = Number(page) * 12;
  try {
    const reviews = await prisma.review.findMany({
      where: { testId: testId as string },
      include: { children: true, user: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
    console.log("reviews", reviews);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};

export const testSubmission = async (req: Request, res: Response) => {
  const { answers, testId } = req.body;
  const userId = req.user.id;
  try {
    const test = await prisma.test.findFirst({
      where: { id: testId as string },
      include: { questions: true },
    });
    let score = 0;
    test?.questions.forEach((ee, index) => {
      if (ee.correctOption == answers[index].answer) {
        score++;
      }
    });
    const history = await prisma.history.create({
      data: {
        userId,
        testId,
        score,
        timing: 0,
      },
    });
    res.status(200).json(history);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong:(" });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const history = await prisma.history.findMany({
      where: { userId: req.user.id },
      skip: 0,
      take: 10,
      orderBy: { completedAt: "desc" },
      include: { test: true },
    });
    console.log(history);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "something went wrong:(" });
  }
};
