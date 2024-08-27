import { useEffect, useState } from "react";
import { toast } from "./components/ui/use-toast";
import axios from "axios";
import { Baseurl } from "./Constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Share2, Trash } from "lucide-react";

const Submissions = () => {
  const [historys, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${Baseurl}/submit`, {
          withCredentials: true,
        });
        console.log(res.data);
        setHistory(res.data);
        setLoading(false);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Not able to fetch your tests history:(",
        });
        setLoading(false);
      }
    };
    getHistory();
  }, []);
  return (
    <div className="flex flex-col gap-3 my-4">
      <p className="text-center font-semibold">Submissions</p>

      {loading ? (
        <div className="h-[70dvh]flex items-center justify-center text-center h-[70dvh]">
          Loading...
        </div>
      ) : (
        <div className="h-[70dvh] overflow-y-scroll flex flex-col gap-3">
          {historys.map((ele, index) => {
            return (
              <div className="border rounded-xl py-2 px-4" key={index}>
                <div className="flex items-center justify-end gap-2">
                  <div className="flex flex-col gap-4 ">
                    <p className="text-2xl font-semibold text-center">
                      {ele.test.title}
                    </p>
                    <p className="text-gray-600">{ele.test.description}</p>
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
                <div className="text-sm flex  items-center justify-end gap-2  my-2">
                  <div className="py-2 px-4 bg-red-500 rounded-md flex flex-wrap items-center gap-3 ">
                    <p>
                      Topic: <span className="underline">{ele.test.topic}</span>
                    </p>
                    <p>
                      Difficulty:{" "}
                      <span className="underline">{ele.test.difficulty}</span>
                    </p>
                    <p>
                      {" "}
                      Total questions:{" "}
                      <span className="underline">
                        {ele.test.questionCount}
                      </span>
                    </p>
                    <p className="py-2 px-4 rounded-xl">
                      <span className="underline">Score {ele.score}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Submissions;
