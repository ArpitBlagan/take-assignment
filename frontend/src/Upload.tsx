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

const uploadSchema = z.object({
  title: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required").max(120, ""),
  file: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, {
      message: "CSV file is required.",
    }),
  diffculty: z.string().min(1, "Field is required"),
  topic: z.string().min(1, "Field is required"),
});
type uploadType = z.infer<typeof uploadSchema>;
const Upload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<uploadType>({ resolver: zodResolver(uploadSchema) });
  const onSubmit: SubmitHandler<uploadType> = async (data) => {};
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
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
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
            {...register("file")}
          />
          {errors.file && (
            <span className="text-red-500">{errors.file?.message}</span>
          )}
          <p className=" text-sm text-gray-500 text-center">
            ** Put the list of questions into a csv file and then upload it **
          </p>
        </div>
        <div className="flex items-center justify-center ">
          <Button className="w-1/2 bg-green-700" type="submit">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
