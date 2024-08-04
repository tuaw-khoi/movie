import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <div className="bg-[#10131a] border-b border-black">
        <Header />
      </div>
      <div className="lg:bg-[#203059] xl:pb-20 shadow-2xl">
        <Outlet />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Layout;
