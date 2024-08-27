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
exports.getSubmissions = exports.testSubmission = exports.getReviews = exports.addReview = exports.getTest = exports.geTests = exports.uploadTest = void 0;
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const __1 = require("..");
const uploadTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: "no csv file found" });
    }
    console.log(req.file);
    const { title, description, topic, difficulty } = req.body;
    console.log(difficulty);
    try {
        let questions = [];
        fs_1.default.createReadStream(req.file.path)
            .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
            questions.push({
                problemStatement: row[0],
                correctOption: row[1],
                options: [row[2], row[3], row[4], row[5]],
            });
        })
            .on("end", function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("finished");
                //@ts-ignore
                fs_1.default.unlink(req.file.path, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "something went wrong:(" });
                    }
                });
                console.log(questions);
                const test = yield __1.prisma.test.create({
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
                const ff = questions.map((ele) => __awaiter(this, void 0, void 0, function* () {
                    return __1.prisma.question.create({
                        data: {
                            testId: test.id,
                            problemStatement: ele.problemStatement,
                            correctOption: ele.correctOption,
                            option: ele.options,
                        },
                    });
                }));
                yield Promise.all(ff);
                res.status(200).json({ message: "successfully uploaded:(" });
            });
        })
            .on("error", function (error) {
            console.log(error.message);
            //@ts-ignore
            fs_1.default.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "something went wrong:(" });
                }
            });
        });
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.uploadTest = uploadTest;
const geTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const limit = 12;
    let skip = Number(page) * 12;
    try {
        const tests = yield __1.prisma.test.findMany({
            skip,
            take: limit,
            include: { Submission: true, user: true },
        });
        res.status(200).json(tests);
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.geTests = geTests;
const getTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testId } = req.query;
    if (!testId) {
        return res.status(400).json({ message: "missing some query parameters:(" });
    }
    try {
        const test = yield __1.prisma.test.findFirst({
            where: { id: testId },
            include: { questions: true, user: true, purchasers: true, review: true },
        });
        res.status(200).json(test);
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.getTest = getTest;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, testId } = req.body;
    try {
        yield __1.prisma.review.create({
            data: {
                comment: text,
                testId,
                userId: req.user.id,
            },
        });
        res.status(202).json({ message: "Review added successfully:)" });
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.addReview = addReview;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, testId } = req.query;
    if (!testId || !page) {
        return res.status(400).json({ message: "missing some query parameters:(" });
    }
    const limit = 12;
    let skip = Number(page) * 12;
    try {
        const reviews = yield __1.prisma.review.findMany({
            where: { testId: testId },
            include: { children: true, user: true },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
        console.log("reviews", reviews);
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.getReviews = getReviews;
const testSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answers, testId } = req.body;
    const userId = req.user.id;
    try {
        const test = yield __1.prisma.test.findFirst({
            where: { id: testId },
            include: { questions: true },
        });
        let score = 0;
        test === null || test === void 0 ? void 0 : test.questions.forEach((ee, index) => {
            if (ee.correctOption == answers[index].answer) {
                score++;
            }
        });
        const history = yield __1.prisma.history.create({
            data: {
                userId,
                testId,
                score,
                timing: 0,
            },
        });
        res.status(200).json(history);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.testSubmission = testSubmission;
const getSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield __1.prisma.history.findMany({
            where: { userId: req.user.id },
            skip: 0,
            take: 10,
            orderBy: { completedAt: "desc" },
            include: { test: true },
        });
        console.log(history);
        res.status(200).json(history);
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong:(" });
    }
});
exports.getSubmissions = getSubmissions;
