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
        <div className="h-[70dvh]flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="h-[70dvh] overflow-y-scroll grid md:grid-cols-3 gap-3">
          {historys.map((ele, index) => {
            return (
              <div className="border rounded-xl" key={index}>
                <div className="flex items-center justify-end">
                  <div className="flex flex-col gap-4">
                    <p className="text-2xl font-semibold">{ele.test.title}</p>
                    <p>{ele.test.description}</p>
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
                <p className="text-sm text-gray-700">Score {ele.score}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Submissions;
