import { LifeBuoy, LogOut, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAuthenStore from "@/midlewares/authenStore";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const Users = () => {
  const { authentication, setAuthentication, setIsAdmin } = useAuthenStore();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setAuthentication(null);
    setIsAdmin(null);
  };
  return (
    <>
      {authentication === "login" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              className="w-9 cursor-pointer"
              src="https://res.cloudinary.com/dfua5nwki/image/upload/v1714954756/imgmovie/user_d4dbwl.svg"
              alt=""
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-7">
            <DropdownMenuLabel>Tài Khoản Của Tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link className="w-full text-sm" to={"/proflier"}>
                  Tài Khoản
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng Xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <img
              className="w-9 cursor-pointer"
              src="https://res.cloudinary.com/dfua5nwki/image/upload/v1714954756/imgmovie/user_d4dbwl.svg"
              alt=""
            />
          </DialogTrigger>
          <DialogContent className=" max-w-[350px] sm:max-w-[550px] mt-[-10px] rounded-2xl ">
            <Tabs
              defaultValue="Login"
              className="w-[300px] sm:w-[500px] sm:px-5 py-5 "
            >
              <TabsList className="grid w-full grid-cols-2 max-w-[300px] sm:max-w-[500px]">
                <TabsTrigger className="" value="Login">
                  Login
                </TabsTrigger>
                <TabsTrigger value="Register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="Login">
                <FormLogin />
              </TabsContent>
              <TabsContent className="h-[430px] sm:h-[550px]" value="Register">
                <FormRegister />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Users;
