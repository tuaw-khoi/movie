import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthenStore from "@/midlewares/authenStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function UserNav() {
  const { setAuthentication, setIsAdmin } = useAuthenStore();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = Cookies.get("user");
      if (userData) {
        const userObject = JSON.parse(userData);
        setUser(userObject);
      }
    };
    fetchUserData();
  }, []);
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAdmin(null);
    setAuthentication(null);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              <img
                className="bg-black-t-50"
                src="https://res.cloudinary.com/dfua5nwki/image/upload/v1714954756/imgmovie/user_d4dbwl.svg"
                alt=""
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.full_name}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="text-sm w-full" to={"/proflier"}>
              Thông Tin Cá Nhân
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link className="text-sm w-full" to={""}>
              Cài Đặt
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link className="ml-2" to={"/"} onClick={logout}>
          Đăng Xuất
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
