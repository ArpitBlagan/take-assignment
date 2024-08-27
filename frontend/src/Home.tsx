import take from "@/assets/assignment.png";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import pay from "@/assets/pngegg.png";
const Home = () => {
  return (
    <div className="my-10 border-t ">
      <div className="h-[80dvh] flex lg:flex-row flex-col justify-center items-center gap-4 border-b">
        <div className="flex flex-col  items-center justify-center gap-4 z-10">
          <p className="md:text-[25px]  text-semibold leading-loose  text-center md:px-10">
            Introducing <span className="underline">Take-Assignment</span> an
            app that makes test-taking easy and engaging.{" "}
            <span className="bg-gradient-to-r from-red-700 via-green-200 to-green-400 inline-block text-transparent bg-clip-text">
              Students can take MCQ tests anytime
            </span>
            , track their progress, and get instant feedback.
          </p>
          <Link
            to="/tests"
            className="py-2 glow-on-hover flex items-center justify-center px-10 text-semibold font-mono"
          >
            Tests
          </Link>
        </div>
        <img src={take} height={400} width={450} className="rounded-xl z-10" />
      </div>
      <div className="flex items-center justify-center gap-3 flex-col mt-4">
        <iframe
          src="https://www.loom.com/embed/2332cfac33e440f284c17c5ce1d75d6a?sid=b03ec8e8-c87e-4c73-8a99-e9dd669398ba"
          className="h-[500px] w-full rounded-xl"
        ></iframe>
        <p className="text-center text-bold leading-loose text-gray-700">
          Demo
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 my-5 h-[30dvh]">
        <div className="flex items-center justify-center gap-3">
          <p className="text-gray-700">Payments through </p>
          <CreditCard />
        </div>
        <img src={pay} width={400} height={500} />
      </div>
    </div>
  );
};

export default Home;
