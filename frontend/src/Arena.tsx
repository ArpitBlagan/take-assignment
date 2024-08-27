import { useEffect, useState } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Numbering from "./components/Numbering";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "./components/ui/button";
import axios from "axios";
import { Baseurl } from "./Constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "./components/ui/use-toast";
const Arena = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(-1);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState<null | any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { testId } = useParams();
  useEffect(() => {
    const getTest = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Baseurl}/gettest?testId=${testId}`, {
          withCredentials: true,
        });
        console.log(res.data);
        let arr: any[] = [];
        for (let i = 0; i < res.data.questionCount; i++) {
          arr.push({ questionNo: i, answered: false, answer: "" });
        }
        console.log(arr);
        setAnswers(arr);
        setLoading(false);
        setTest(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getTest();
  }, []);
  useEffect(() => {
    if (isFullscreen) {
      document
        .getElementById("fullscreen")
        ?.requestFullscreen()
        .catch((err: any) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const body = {
        answers,
        testId,
      };
      await axios.post(`${Baseurl}/submit`, body, {
        withCredentials: true,
      });
      setSubmitLoading(false);
      navigate("/submissions");
    } catch (err) {
      toast({
        title: "Not able to submit test please try again later:(",
        variant: "destructive",
      });
      setSubmitLoading(false);
    }
  };
  if (id == -1) {
    return (
      <div className="min-h-[90dvh] flex items-center justify-center">
        {test ? (
          <Intro
            title={test.title}
            description={test.description}
            questionCount={test.questionCount}
            id={id}
            setId={setId}
            setIsFullscreen={setIsFullscreen}
            loading={loading}
          />
        ) : (
          <div>{loading ? "Loading..." : "Oops something went wrong 😑"}</div>
        )}
      </div>
    );
  } else if (test.questions.length == id) {
    return (
      <div
        className="min-h-[80dvh]  flex flex-col gap-4 mt-5 items-center justify-center"
        id="fullscreen"
      >
        <div className="py-2 px-4 rounded-xl border w-full flex flex-col gap-4">
          <p className="text-center font-semibold">Questions</p>
          <Numbering
            total={test.questions.length}
            answers={answers}
            id={id}
            setId={setId}
          />
        </div>
        <p className="font-semibold text-2xl text-center">
          Are You Sure You Are Done 🤔?
        </p>
        <div className="flex items-center gap-3">
          <Button
            className="md:w-1/2 bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setId(0);
            }}
          >
            Go Back
          </Button>
          <p>⚔</p>
          <Button
            className="md:w-1/2 bg-green-700"
            disabled={submitLoading}
            onClick={(e) => {
              e.preventDefault();
              setIsFullscreen(false);
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[80dvh] flex flex-col gap-4 mt-5 fullscreen px-5 py-2"
      id="fullscreen"
    >
      <div className="grid md:grid-cols-3 gap-2">
        <div className="flex gap-3 items-center justify-center">
          <span className="bg-green-700 py-2 px-4 border rounded-xl"></span>
          Answered
        </div>
        <div className="flex gap-3 items-center justify-center">
          <span className="bg-orange-700 py-2 px-4 border rounded-xl"></span>
          Attempting
        </div>
        <div className="flex gap-3 items-center justify-center">
          <span className=" py-2 px-4 border rounded-xl"></span>
          Not Answered or Not Attempted
        </div>
      </div>
      <div className="flex items-center gap-3 justify-end">
        <p className="text-gray-700 flex-1 text-center font-semibold">
          Total - [{test.questions.length}]
        </p>
        <Button
          className="bg-green-700"
          disabled={submitLoading}
          onClick={(e) => {
            e.preventDefault();
            setIsFullscreen(false);
            handleSubmit();
          }}
        >
          Submit
        </Button>
        <Button
          className="bg-red-700"
          onClick={(e) => {
            e.preventDefault();
            setIsFullscreen(false);
          }}
        >
          Exit
        </Button>
      </div>
      <div className="flex items-center justify-end">
        <p className="font-semibold">Don't Referesh 🔄</p>
      </div>
      <ResizablePanel defaultSize={30}>
        <div className="h-full overflow-y-scroll">
          <Numbering
            total={test.questions.length}
            answers={answers}
            id={id}
            setId={setId}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="h-full overflow-y-scroll">
          <Question
            questionStatement={test.questions[id].problemStatement}
            answer={answers[id]}
            options={test.questions[id].option}
            id={id}
            setId={setId}
            setAnswers={setAnswers}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Arena;
