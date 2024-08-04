import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  return (
    <div className="left-0 fixed bg-black w-[200px] h-full text-white">
      <img className="mt-[-30px]" src="src\asset\img\logoAdmin.svg" alt="" />
      <div className=" space-y-5">
        <h3 className="pl-3 text-gray-300 ">Menu</h3>
        <ul className="  space-y-5 flex flex-col">
          <Link
            className="hover:cursor-pointer py-2 rounded-lg pl-5 hover:bg-[#0f172ae6] w-full"
            to={""}
          >
            DashBoard
          </Link>
          <Link
            className="hover:cursor-pointer py-2 rounded-lg pl-5 hover:bg-[#0f172ae6] w-full"
            to={""}
          >
            Phim
          </Link>
          <Link
            className="hover:cursor-pointer py-2 rounded-lg pl-5 hover:bg-[#0f172ae6] w-full"
            to={""}
          >
            Người Dùng
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
