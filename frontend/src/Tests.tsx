import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { CircleX, EllipsisVerticalIcon, Share2, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import axios from "axios";
import { Baseurl } from "./Constant";
import { toast } from "./components/ui/use-toast";
const topics = [
  { id: 1, name: "DSA" },
  { id: 2, name: "English" },
  { id: 3, name: "Aptitude" },
  { id: 4, name: "Database" },
  { id: 5, name: "other" },
];
interface topic {
  name: string;
}
const Tests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sele, setSele] = useState<topic[]>([]);
  const [testPage, setTestPage] = useState(0);
  const [tests, setTests] = useState<any[]>([]);
  useEffect(() => {
    const getTests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Baseurl}/tests?page=${testPage}`, {
          withCredentials: true,
        });
        setTests(res.data);
        setLoading(false);
      } catch (err) {
        toast({
          title: "something went wrong while fetching tests:(",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    getTests();
  }, [testPage]);
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
        {loading ? (
          <div className="text-center">Loading..</div>
        ) : (
          tests.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex flex-col  gap-4 items-center justify-between border rounded-xl py-2 px-6"
              >
                <div className="flex gap-3 justify-between items-center w-full py-5">
                  <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-[30px]  font-semibold">
                      {ele.title}
                    </p>
                    <p className="text-md ">{ele.description}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-700 text-sm">
                        Submission count: {ele.Submission?.length as number}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Topic: {ele.topic}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Difficulty: {ele.difficulty}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVerticalIcon className="cursor-pointer w-[100px] h-[100px]" />
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
                  <Button
                    className="flex items-center justify-center py-3 px-6"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/test", {
                        state: {
                          user: ele,
                        },
                      });
                    }}
                  >
                    Take Test
                  </Button>
                </div>
              </div>
            );
          })
        )}
        <div>
          <p className="text-gray-700 text-md text-center">That's it</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button disabled={testPage == 0}>Prev</Button>
        <span className="text-2xl">/</span>
        <Button disabled={tests.length < 12}>Next</Button>
      </div>
    </div>
  );
};

export default Tests;
