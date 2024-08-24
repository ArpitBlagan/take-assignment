import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";

const Question = ({ questionStatement, options, setId, id }: any) => {
  return (
    <div className="flex flex-col  gap-5 items-center justify-center">
      <p>
        <span>{id + 1}. </span>
        {questionStatement}
      </p>
      <div className="grid md:grid-cols-2 gap-3 w-full">
        {options.map((ele: any, index: any) => {
          return (
            <div
              key={index}
              className="flex items-center gap-3 border py-2 px-4 rounded-lg cursor-pointer"
            >
              <Checkbox id={index} />
              <span>{index + 1}</span>

              <p>{ele}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-3 w-full">
        <Button
          onClick={(e) => {
            e.preventDefault();
            if (id > 0) {
              setId(id - 1);
            }
          }}
        >
          ⬅ Prev
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setId(id + 1);
          }}
        >
          Next ➡️
        </Button>
      </div>
    </div>
  );
};

export default Question;
