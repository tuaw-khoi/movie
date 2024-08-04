import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import SlideRecommend from "./SlideRecommend";
const WatchMovie = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const movie = location?.state?.movie;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [tabInfor, setTabInfor] = useState<string>("desc");
  const renderDescription = (desc: string) => {
    if (!showFullDescription && desc.split(" ").length > 50) {
      return `${desc.split(" ").slice(0, 50).join(" ")}...`;
    }
    return desc;
  };
  if (!movie) {
    return <div>Loading</div>;
  }
  const handletab = (tab: string) => {
    setTabInfor(tab);
  };
  const title = movie?.title
    .trim()
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
  return (
    <div>
      <div className="my-3 ml-7 h-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link className="text-[#408bea] " to={"/"}>
                  Trang Chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-white text-white">
                {title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" sm:px-8 sm:py-5 sm:pt-10 bg-black flex justify-center sm:block">
        <iframe
          width="914"
          height="514"
          className="sm:w-full h-[300px] sm:h-[450px] w-full"
          title={movie.title}
          src={movie.moviesUrl_id}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className=" h-full bg-[#00000080] ">
        <h3 className=" text-[#ff9800] pl-7 py-3 ">
          Nếu không xem được vui lòng tải lại trang !
        </h3>
      </div>

      <div className="ml-3 sm:ml-7 my-5">
        <div
          className="bg-[
          #10141f] flex  space-x-5"
        >
          <img
            src={movie.img_url}
            alt={movie.title}
            className="w-[120px] sm:w-[150px] xl:w-[160px] object-cover shadow-xl"
          />

          <div className="flex flex-col w-full">
            <h2 className="text-[23px]">{movie.title}</h2>
            <span className="text-[18px] text-gray-500 mb-2">
              {" "}
              {movie.release_year.slice(0, 4)}
            </span>
            <div className="flex py-2 space-x-3 border-y border-gray-500 text-slate-200">
              <p>Thời Gian: {movie.runtime} phút</p>
              <p> Quốc Gia: {movie.country_id}</p>
            </div>
            <p className="mt-2">Thể loại: {movie.genre_id}</p>
          </div>
        </div>
        <div
          className="bg-[
          #10141f] border-y-2 border-gray-500 py-3 mt-5 space-x-3"
        >
          <button
            onClick={() => handletab("desc")}
            className={`rounded-sm p-2 ${tabInfor === "desc" ? "bg-[#3E88E5]" : ""}`}
          >
            Thông Tin
          </button>

          <button
            onClick={() => handletab("actors&director")}
            className={`rounded-sm p-2 ${tabInfor === "actors&director" ? "bg-[#3E88E5]" : ""}`}
          >
            Diễn Viên
          </button>
        </div>
        {tabInfor === "desc" ? (
          <div className="mt-2 space-y-2">
            <h3 className="text-[18px] ml-2">Tóm tắt</h3>
            <p className=" ml-2 text-gray-300 text-[15px]">
              {renderDescription(movie.description)}
              {movie.description.split(" ").length > 50 && (
                <button
                  className="text-blue-200"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? `  Thu gọn` : "Xem thêm"}
                </button>
              )}
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 mt-3">
            <div>
              <h3>Đạo Diễn</h3>
              <p>{movie.directors} (Director)</p>
            </div>
            <div>
              <h5 className="text-[16px]">Diễn Viên:</h5>
              <p className="text-[15px] mt-1"> {movie.actor}</p>
            </div>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-lg xl:pl-1">Phim Mới</h3>
          <SlideRecommend movieDemo={movie} />
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
