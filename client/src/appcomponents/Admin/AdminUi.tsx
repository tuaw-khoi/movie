import { Outlet } from "react-router-dom";
import NavbarAdmin from "./adminElement/NavbarAdmin";

const AdminUi = () => {
  return (
    <div>
      <NavbarAdmin />
      <div className="ml-[200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminUi;
