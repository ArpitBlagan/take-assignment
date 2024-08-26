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
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "./components/ui/use-toast";
import axios from "axios";
import { Baseurl } from "./Constant";
// const reviews = [
//   {
//     name: "Arpit Blagan",
//     email: "arpitblagan27@gmail.com",
//     comment: "good quality of questions",
//     postedAt: "22/08/2024",
//   },
//   {
//     name: "Arpit Blagan",
//     email: "arpitblagan27@gmail.com",
//     comment: "good quality of questions",
//     postedAt: "",
//   },
//   {
//     name: "Arpit Blagan",
//     email: "arpitblagan27@gmail.com",
//     comment: "good quality of questions",
//     postedAt: "",
//   },
//   {
//     name: "Arpit Blagan",
//     email: "arpitblagan27@gmail.com",
//     comment: "good quality of questions",
//     postedAt: "",
//   },
// ];
const Test = () => {
  const navigate = useNavigate();
  const [reviewPage, setReviewPage] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [text, setText] = useState("");
  const uploadReview = async () => {
    if (text.length == 0) {
      toast({
        variant: "destructive",
        title: "field is required",
      });
      return;
    }
    try {
      setUpLoading(true);
      await axios.post(
        `${Baseurl}/postreview`,
        { text, testId: state.user.id },
        { withCredentials: true }
      );
      setReviews((prev) => {
        return [, prev];
      });
      setUpLoading(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "something went wrong while uploading you review",
      });
      setUpLoading(false);
    }
  };
  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${Baseurl}/getreviews?testId=${state.user.id}&page=${reviewPage}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "something went wrong while fetching the reviews",
        });
        setLoading(false);
      }
    };
    getReviews();
  }, [reviewPage]);
  return (
    <div className="flex flex-col gap-3 my-5">
      <div className=" flex flex-col gap-3 border rounded-xl px-3 py-2">
        <p className="text-2xl font-semibold">{state.user.title}</p>
        <p className="">{state.user.description}</p>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-700">
            Submission count: {state.user.Submission?.length as number}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-700">By: {state.user.user.name}</p>
          <p className="text-sm text-gray-700">{state.user.user.email}</p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            className="bg-green-700"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/arena/${state.user.id}`);
            }}
          >
            Take Test
          </Button>
        </div>
      </div>
      <div className="min-h-[50dvh] flex flex-col gap-5">
        <p className=" text-center">Reviews</p>
        <div className="flex items-center gap-2 md:gap-4">
          <Input
            placeholder="enter your review here"
            className="flex-1"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              uploadReview();
            }}
            disabled={upLoading}
          >
            Comment
          </Button>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {!loading &&
            reviews.map((ele, index) => {
              return (
                <div className="border rounded-xl py-2 px-4" key={index}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={ele.user.profileImage}
                          className="rounded-full"
                          alt="default"
                          height={50}
                          width={50}
                        />
                        <p className="text-sm">{ele.user.name}</p>
                      </div>
                      <p className="text-gray-700 text-sm">{ele.user.email}</p>
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
                  <p className="py-2 px-4 border rounded-xl">{ele.comment}</p>
                  <div className="flex items-center justify-end text-sm mt-3">
                    <p className="text-gray-700">{ele.createdAt}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <p className="text-center">That's it</p>
        <div className="flex items-center justify-center gap-5">
          <Button
            disabled={reviewPage == 0}
            onClick={(e) => {
              e.preventDefault();
              setReviewPage(reviewPage - 1);
            }}
          >
            Prev
          </Button>
          <span className="text-2xl">/</span>
          <Button
            disabled={reviewPage < 10}
            onClick={(e) => {
              e.preventDefault();
              setReviewPage(reviewPage + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
