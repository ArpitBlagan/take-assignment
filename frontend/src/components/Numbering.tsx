const Numbering = ({ total, id, setId, answers }: any) => {
  return (
    <div className="py-2 px-4 border rounded-xl ">
      <div className="flex flex-wrap gap-3 ">
        {Array.from({ length: total }).map((_, index) => {
          return (
            <div
              className={`py-1 px-3 border rounded-xl cursor-pointer ${
                id == index ? "bg-orange-700" : ""
              }
              ${answers[index].answered ? "bg-green-700" : ""}
              `}
              onClick={() => {
                setId(index);
              }}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Numbering;
