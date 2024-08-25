import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "./components/ui/use-toast";
import { Baseurl } from "./Constant";
interface user {
  id: string;
  isLoggedIn: boolean;
  name: string;
  email: string;
  profileImage: string;
}
interface data {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>>;
}
export const con = createContext<data | null>(null);
const Context = ({ children }: any) => {
  const [user, setUser] = useState<user>({
    id: "",
    isLoggedIn: false,
    name: "",
    email: "",
    profileImage: "",
  });
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const res = await axios.get(`${Baseurl}/isloggedin`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser({
          id: res.data.id,
          isLoggedIn: true,
          name: res.data.name,
          email: res.data.email,
          profileImage: res.data.profileImage,
        });
        toast({
          title: `Welcom back ${res.data.name}`,
        });
      } catch (err) {
        console.log(err);
      }
    };
    checkIsLoggedIn();
  }, []);
  return <con.Provider value={{ user, setUser }}>{children}</con.Provider>;
};

export default Context;
