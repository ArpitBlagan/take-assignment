import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center py-5 border-b   ">
      <Link
        to="/"
        className="hidden md:block font-semibold hover:underline text-[20px]"
      >
        Take-Assignment
      </Link>
      <Link
        to="/"
        className="md:hidden block font-semibold hover:underline text-[20px]"
      >
        <Home />
      </Link>
      <div className="flex-1 flex items-center justify-end gap-4">
        <Link to="/tests" className="hover:text-red-500">
          Tests
        </Link>
        <Link to="/signup" className="hover:text-red-500">
          Signup
        </Link>
        <Link to="/signin" className="hover:text-red-500">
          Signin
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
