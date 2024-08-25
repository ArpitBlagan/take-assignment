import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Baseurl } from "./Constant";
import axios from "axios";
import { useState } from "react";
import { toast } from "./components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const uploadSchema = z.object({
  title: z.string().min(1, "Field is required"),
  description: z
    .string()
    .min(1, "Field is required")
    .max(420, "atmost 420 characters are allowed"),
  diffculty: z.string().min(1, "Field is required"),
  topic: z.string().min(1, "Field is required"),
});
type uploadType = z.infer<typeof uploadSchema>;
const Upload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<uploadType>({ resolver: zodResolver(uploadSchema) });
  const onSubmit: SubmitHandler<uploadType> = async (data) => {
    console.log(data);
    if (!file) {
      toast({
        variant: "destructive",
        title: "Please choose question's csv file first",
      });
      return;
    }
    toast({ title: "uploading test:)" });
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("topic", data.topic);
      formdata.append("difficulty", data.diffculty);
      await axios.post(`${Baseurl}/uploadtest`, formdata, {
        withCredentials: true,
      });
      navigate("/tests");
      setLoading(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "something went wrong while uploading test:(",
      });
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[80dvh] flex items-center justify-center mt-10">
      <form
        className="md:w-8/12 w-full flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <label>Title</label>
          <Input placeholder="Must Do DSA MCQ's" {...register("title")} />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label>Description</label>
          <Textarea
            placeholder="Great for revision for placements. Must try and importanat one"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 ">
          <div className="flex flex-col items-center justify-center gap-3  w-1/2">
            <label>Difficulty</label>
            <Select
              onValueChange={(e) => {
                setValue("diffculty", e);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Difficulty"
                  {...register("diffculty")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
            {errors.diffculty && (
              <span className="text-red-500">{errors.diffculty.message}</span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center  gap-3 w-1/2">
            <label>Topic</label>
            <Select
              onValueChange={(e) => {
                setValue("topic", e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DSA">DSA</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Aptitude">Aptitude</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.topic && (
              <span className="text-red-500">{errors.topic.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label>CSV file</label>
          <Input
            type="file"
            accept=".csv"
            className="text-gray-400 dark:bg-gray-700"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
          <p className=" text-sm text-gray-500 text-center">
            ** Put the list of questions into a csv file and then upload it **
          </p>
        </div>
        <div className="flex items-center justify-center ">
          <Button
            className="w-1/2 bg-green-700"
            type="submit"
            disabled={loading}
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
