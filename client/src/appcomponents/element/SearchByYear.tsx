import useMovies from "@/hooks/userMovie";
import { Tmovie } from "@/types/movie";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const SearchByYear = () => {
  const { data: movies } = useMovies();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const years = location?.state?.year;
  const filtermovies = movies?.filter(
    (movie: Tmovie) => movie.release_year.slice(0, 4) == years
  );
  return (
    <div className="ml-4">
      <div className="flex items-center space-x-4 justify-center w-full">
        <div className="h-1 w-full bg-gray-500"></div>
        <h2 className="text-[30px] whitespace-nowrap">{years}</h2>
        <div className="h-1 w-full  bg-gray-500"></div>
      </div>
      <div className="flex items-center space-x-3 ">
        <div className="h-[20px] w-[3px] bg-[#408bea]"></div>
        <h2 className="text-[20px]">Phim {years} mới cập nhật</h2>
      </div>
      <div className="grid grid-cols-4 mt-6 ml-4 gap-y-4">
        {filtermovies?.map((movie: Tmovie) => (
          <Link
            className="flex  flex-col items-center h-[280px] w-[160px]  space-y-4 "
            to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
            state={{ movie: movie }}
          >
            <img
              className="h-[210px] w-full object-cover"
              src={movie.img_url}
              alt={movie.title}
            />
            <div className="text-left w-full flex flex-col">
              <h3 className="text-base">
                {movie.title.length > 22
                  ? movie.title.slice(0, 21).trim() + "..."
                  : movie.title}
              </h3>
              <div className="space-x-1 text-yellow-500 text-sm">
                <span>
                  {movie.country_id
                    ?.split(/\s+/)
                    .map((word) => word[0])
                    .join("") ?? ""}{" "}
                </span>
                <span>{movie.release_year.slice(0, 4)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchByYear;
