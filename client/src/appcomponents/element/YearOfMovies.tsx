import useMovies from "@/hooks/userMovie";
import { Tmovie } from "@/types/movie";
import { Link } from "react-router-dom";

const YearOfMovies = () => {
  const { data: movies } = useMovies();
  const years = Array.from({ length: 15 }, (_, i) => 2010 + i).reverse();
  const specialMovie = movies?.slice(4, 5);
  return (
    <div className="p-4 pl-0 mt-2 ">
      <div>
        <h3
          className="text-[
#fff9] text-xl"
        >
          Năm Phát Hành
        </h3>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {years.map((year) => (
            <Link
              className="text-[
                #fff9]  py-2 bg-black-t-50 flex justify-center hover:bg-[#408bea]"
              to={`/searchbyyear/${year}`}
              state={{ year }}
              key={year}
            >
              <span className="opacity-[0.9] text-[14px] text-center">
                {year}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <div>
            {specialMovie ? (
              <Link
                to={`/movies/${specialMovie[0].title.trim().replace(/\s+/g, "-").toLowerCase()}`}
                state={{ movie: specialMovie[0] }}
                className="hover:blur-[0.8px] transition  ease-in-out"
              >
                <div
                  key={specialMovie[0].id}
                  className="relative z-50 flex  items-center "
                >
                  <img
                    className="h-36 w-full object-cover"
                    src={specialMovie[0].img_url}
                    alt={specialMovie[0].title}
                  />
                  <div className="absolute bottom-2 left-3  ">
                    <p className="shadow-2xl">{specialMovie[0].title}</p>
                    <span className="text-yellow-500">
                      {specialMovie[0].release_year.slice(0, 4)}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-y-3 mt-10">
            {movies?.slice(5, 9)?.map((movie: Tmovie) => (
              <Link
                className="flex   items-center h-[110px] w-full bg-[#0b0d12] hover:bg-black-t-50 shadow-2xl space-x-2"
                to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
                state={{ movie: movie }}
                key={movie.id}
              >
                <div className=" w-[150px]">
                  <img
                    className="h-[110px] w-full object-cover"
                    src={movie.img_url}
                    alt={movie.title}
                  />
                </div>
                <div className="text-left w-full flex flex-col space-y-1 justify-center">
                  <h3 className="text-base">
                    {movie.title.length > 30
                      ? movie.title.slice(0, 30).trim() + "..."
                      : movie.title}
                  </h3>
                  <div className=" text-yellow-500 text-sm ">
                    <span>{movie.genre_id}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearOfMovies;
