import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { CircleX, EllipsisVerticalIcon, Share2, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
const topics = [
  { id: 1, name: "DSA" },
  { id: 2, name: "English" },
  { id: 3, name: "Aptitude" },
  { id: 4, name: "Database" },
];
interface topic {
  name: string;
}
const Tests = () => {
  const [sele, setSele] = useState<topic[]>([]);
  const [testPage, setTestPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [tests, setTests] = useState<any[]>([
    { name: "Datastructure & Algo (beginner)", count: "100" },
  ]);
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[90dvh]">
      <p className="text-3xl font-semibold my-2">Topics</p>
      <div className="flex items-center flex-wrap gap-3 border py-2 px-4 rounded-xl w-full">
        {topics.map((ele) => {
          let ok = sele.find((ee) => {
            return ee.name == ele.name;
          });
          return (
            <div
              className="flex items-center gap-3  py-2 px-4 border rounded-xl"
              key={ele.id}
            >
              <p
                className="cursor-pointer"
                onClick={() => {
                  let name = sele.find((ee) => {
                    return ee.name == ele?.name;
                  });
                  if (!name) {
                    setSele((prev) => {
                      return [...prev, { name: ele.name }];
                    });
                  }
                }}
              >
                {ele.name}
              </p>
              {ok && (
                <CircleX
                  className="cursor-pointer"
                  onClick={() => {
                    let arr = sele.filter((ee) => {
                      return ee.name != ele.name;
                    });
                    setSele(arr);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center">
        <Input placeholder="🔍  search" className="px-4 py-3 w-full md:w-1/3" />
      </div>
      <hr />
      <div className="flex-1 flex flex-col gap-3 w-full">
        <p className="text-center">Avaliable Tests</p>
        {tests.map((ele, index) => {
          return (
            <div
              key={index}
              className="flex flex-col  gap-4 items-center justify-between border rounded-xl py-2 px-6"
            >
              <div className="flex gap-3 justify-between items-center w-full">
                <div className="flex flex-col gap-4">
                  <p className="text-xl md:text-[30px]  font-semibold">
                    {ele.name}
                  </p>
                  <p className="text-md text-gray-700">
                    asf asdf e e s fa aflfj asldfj asldfj asldfjasldfjaslkdjf
                    lasdfa faskljfoeijfeije
                  </p>
                  <p className="text-gray-700 text-sm">
                    submission count: {ele.count}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVerticalIcon className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <p className="flex items-center gap-3 cursor-pointer">
                        <Share2 /> Share
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <p className="flex items-center gap-3 cursor-pointer">
                        <Trash />
                        Delete
                      </p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex-1 flex items-center justify-end gap-2 w-full">
                <Link
                  to="/test"
                  className="glow-on-hover flex items-center justify-center py-3 px-6"
                >
                  Take Test
                </Link>
              </div>
            </div>
          );
        })}
        <div>
          <p className="text-gray-700 text-md text-center">That's it</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button disabled={testPage == 0}>Prev</Button>
        <span className="text-2xl">/</span>
        <Button disabled={totalPage == totalPage}>Next</Button>
      </div>
    </div>
  );
};

export default Tests;
