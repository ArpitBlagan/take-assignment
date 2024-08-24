import { useState } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Numbering from "./components/Numbering";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "./components/ui/button";
const Arena = () => {
  const [id, setId] = useState(-1);
  if (id == -1) {
    return (
      <div className="min-h-[90dvh] flex items-center justify-center">
        <Intro
          title={"DSA Mcq's"}
          description={"asdfasdf as df asdf a f asdf"}
          questionCount={10}
          id={id}
          setId={setId}
        />
      </div>
    );
  } else if (id == 100) {
    return (
      <div className="min-h-[80dvh] flex flex-col gap-4 mt-5 items-center justify-center">
        <p className="font-semibold">Are You Sure?</p>
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
        <p className="font-semibold">Thank you for taking test</p>
        <Button className="md:w-1/2 bg-green-700">Submit</Button>
      </div>
    );
  }
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[80dvh] flex flex-col gap-4 mt-5"
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
          Total - [{100}]
        </p>
        <Button className="bg-green-700">Submit</Button>
        <Button className="bg-red-700">Exit</Button>
      </div>
      <div className="flex items-center justify-end">
        <p className="font-semibold">Don't Referesh 🔄</p>
      </div>
      <ResizablePanel defaultSize={30}>
        <div className="h-full overflow-y-scroll">
          <Numbering total={100} id={id} setId={setId} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="h-full overflow-y-scroll">
          <Question
            questionStatement={
              "Which of the following data structures allows you to insert and delete elements from both ends?"
            }
            options={["Stack", "Queue", "Deque", "Array"]}
            id={id}
            setId={setId}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Arena;
