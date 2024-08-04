import { Outlet, useLocation } from "react-router-dom";
import YearOfMovies from "../element/YearOfMovies";
import { useEffect } from "react";

const Homepage = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="lg:container ">
      <div className="bg-[#10131a] text-white ">
        <div className="flex shadow-xl lg:space-x-10 space-x-5 ">
          <div className="md:w-[63%] lg:w-2/3 h-full  w-full ">
            <Outlet />
          </div>
          <div className="w-[1px] hidden xl:block bg-white my-5 opacity-[0.5]"></div>
          <div className="hidden  md:block lg:w-1/3 md:w-1/3 max-w-[360px] ">
            <YearOfMovies />
          </div>
        </div>
      </div>
    </div>
  );
};
// md:w-full lg:w-2/3
// md:w-1/3  lg:w-1/3
export default Homepage;
