import { Separator } from "@/components/ui/separator";
import { Link, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const ManagerAccount = () => {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const location = useLocation();
  const isChangePasswordPath = location.pathname.includes("changepassword");
  return (
    <div className="mx-2 sm:mx-10">
      <div className="my-10">
        <Link
          to={user && user.role === "1" ? "/admin/settings" : "/"}
          className="px-4 py-3 bg-yellow-400 rounded-lg"
        >
          Thoát
        </Link>
        <h1 className="text-[25px] mt-3">Tài Khoản</h1>
        <p className="text-xl text-gray-500">
          Quản lý cài đặt tài khoản của bạn và đặt tùy chọn.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex space-x-10">
        <div className="min-w-[50px] sm:min-w-[300px] mt-5 flex flex-col ">
          <Link
            to={""}
            className={`w-[100px] sm:w-full text-left sm:px-4 py-2 rounded-xl font-semibold ${isChangePasswordPath ? "" : "bg-gray-200"}`}
          >
            Profile
          </Link>
          <Link
            to={"changepassword"}
            className={`w-[100px] sm:w-full text-left sm:px-4 py-2 rounded-xl font-semibold ${isChangePasswordPath ? "bg-gray-200" : ""}`}
          >
            Đổi Mật Khẩu
          </Link>
        </div>
        <div className=" flex-grow mx-5 ">
          <div className="my-5">
            <h1 className="text-xl">Thông Tin Cá Nhân</h1>
          </div>
          <Separator className="my-6" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerAccount;
