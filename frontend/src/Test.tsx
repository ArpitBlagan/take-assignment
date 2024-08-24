import { CopyIcon, EllipsisVerticalIcon, Trash } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
const reviews = [
  {
    name: "Arpit Blagan",
    email: "arpitblagan27@gmail.com",
    comment: "good quality of questions",
    postedAt: "22/08/2024",
  },
  {
    name: "Arpit Blagan",
    email: "arpitblagan27@gmail.com",
    comment: "good quality of questions",
    postedAt: "",
  },
  {
    name: "Arpit Blagan",
    email: "arpitblagan27@gmail.com",
    comment: "good quality of questions",
    postedAt: "",
  },
  {
    name: "Arpit Blagan",
    email: "arpitblagan27@gmail.com",
    comment: "good quality of questions",
    postedAt: "",
  },
];
const Test = () => {
  const [reviewPage, setReviewPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-3 my-5">
      <div className=" flex flex-col gap-3 border rounded-xl px-3 py-2">
        <p className="text-2xl">Title</p>
        <p className=" text-lg">Description</p>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-700">Submission count: 100</p>
          <p className="text-sm text-gray-700">Total Reviews: 100</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-700">By: Arpit Blagan</p>
          <p className="text-sm text-gray-700">arpitblagan27@gmail.com</p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button className="bg-green-700">Buy Now for ₹300</Button>
        </div>
      </div>
      <div className="min-h-[50dvh] flex flex-col gap-5">
        <p className=" text-center">Reviews</p>
        <div className="flex items-center gap-2 md:gap-4">
          <Input placeholder="enter your review here" className="flex-1" />
          <Button>Comment</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((ele, index) => {
            return (
              <div className="border rounded-xl py-2 px-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <img src="" className="rounded-xl" alt="default" />
                      <p className="text-sm">{ele.name}</p>
                    </div>
                    <p className="text-gray-700 text-sm">{ele.email}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVerticalIcon className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <DropdownMenuItem>
                        <p className="flex items-center gap-3 cursor-pointer">
                          <CopyIcon /> Copy
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
                <p className="">{ele.comment}</p>
                <div className="flex items-center justify-end text-sm">
                  <p className="text-gray-700">{ele.postedAt}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-5">
          <Button disabled={reviewPage == 0}>Prev</Button>
          <span className="text-2xl">/</span>
          <Button disabled={reviewPage == totalPage}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
