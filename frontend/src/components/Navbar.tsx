import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Home } from "lucide-react";
import { useContext } from "react";
import { con } from "@/Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import axios from "axios";
import { Baseurl } from "@/Constant";
import { toast } from "./ui/use-toast";
const Navbar = () => {
  const value = useContext(con);
  const handleLogout = async () => {
    try {
      await axios.get(`${Baseurl}/logout`, { withCredentials: true });
      value?.setUser({
        profileImage: "",
        name: "",
        email: "",
        id: "",
        isLoggedIn: false,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Not able to log you out try again later",
      });
    }
  };
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
        <ModeToggle />
        <Link to="/tests" className="hover:text-red-500">
          Tests
        </Link>
        {!value?.user.isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link to="/signup" className="hover:text-red-500">
              Signup
            </Link>
            <Link to="/signin" className="hover:text-red-500">
              Signin
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="glow-on-hover py-2 px-5">Profile</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <img
                    src={value?.user.profileImage}
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                  <p className="font-semibold">{value?.user.name}</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-center text-gray-500">
                  {value?.user.email}
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-center text-gray-500">
                  <Link to="/upload" className="border rounded-xl py-2 px-4">
                    Upload Test
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-end">
                  <Button
                    variant={"destructive"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
