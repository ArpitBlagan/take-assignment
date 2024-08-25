import { Button } from "./ui/button";

const Intro = ({
  description,
  title,
  questionCount,
  id,
  setId,
  setIsFullscreen,
  loading,
}: any) => {
  return (
    <div className="flex flex-col  gap-4 py-10 px-4 border rounded-xl w-full">
      <div className="flex-1 ">
        <p className="text-2xl text-center font-semibold">{title}</p>
        <p className="text-center text-md ">{description}</p>
        <p className=" text-end">
          <span className="text-gray-700 font-semibold">Total questions</span>{" "}
          {questionCount}
        </p>
      </div>
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
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          className="md:w-1/4 w-1/2 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setId(id + 1);
            setIsFullscreen(true);
          }}
          disabled={loading}
        >
          {loading ? "Wait " : "Start then 🚀"}
        </Button>
      </div>
    </div>
  );
};

export default Intro;
