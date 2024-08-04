import useMovies from "@/hooks/userMovie";
import { Tmovie } from "@/types/movie";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NewMovieList = () => {
  const location = useLocation();
  const pathName = location.pathname
    .split("/")
    .map((part) => decodeURIComponent(part).toLowerCase());
  const { data } = useMovies();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  let movies = [];
  let type;
  let filterGenreIds = data?.filter((movie: Tmovie) =>
    pathName?.includes(
      (movie?.genre_id || "").trim().replace(/\s+/g, "-").toLowerCase()
    )
  );

  let filterCountryIds = data?.filter((movie: Tmovie) =>
    pathName?.includes(
      (movie?.country_id || "").trim().replace(/\s+/g, "-").toLowerCase()
    )
  );
  if (pathName.includes("newmovies")) {
    movies = data?.slice(0, 16);
    type = "";
  } else if (filterGenreIds?.length > 0) {
    movies = filterGenreIds;
    type = filterGenreIds[0].genre_id;
  } else if (filterCountryIds?.length > 0) {
    movies = filterCountryIds;
    type = filterCountryIds[0].country_id;
  }

  return (
    <div className="sm:pl-7 mt-4 px-2">
      <div className="flex items-center space-x-4 justify-center w-full">
        <div className="h-1 w-full bg-gray-500"></div>
        <h2 className="text-[30px] whitespace-nowrap">Phim {type || "mới"}</h2>
        <div className="h-1 w-full  bg-gray-500"></div>
      </div>
      <div className="flex items-center space-x-3 ">
        <div className="h-[20px] w-[3px] bg-[#408bea]"></div>
        <h2 className="text-[20px]">Phim {type} mới cập nhật</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  mt-4 ml-4 gap-4">
        {movies?.map((movie: Tmovie) => (
          <Link
            key={movie.id}
            className="flex  flex-col items-center h-[270px] w-[155px] sm:w-[140px] mt:w-[180px] md:w-[150px] xl:w-[180px] shadow-xl  "
            to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
            state={{ movie: movie }}
          >
            <div className="overflow-hidden relative group">
              <h3 className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-full flex items-center justify-center z-50">
                Xem
              </h3>
              <img
                className="h-[190px] w-[150px] sm:w-[180px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-50"
                src={movie.img_url}
                alt={movie.title}
              />
            </div>
            <div className="text-left w-full flex flex-col ml-4 mt-3">
              <h3 className="text-base hidden md:block">
                {movie.title.length > 22
                  ? movie.title.slice(0, 21).trim() + "..."
                  : movie.title}
              </h3>
              <h3 className="text-base md:hidden">
                {movie.title.length > 16
                  ? movie.title.slice(0, 16).trim() + "..."
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

export default NewMovieList;
