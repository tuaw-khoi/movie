import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tmovie } from "@/types/movie";
import "@/slideConfig.css";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
type Props = {
  movies: [];
};
const SlideConfig = ({ movies }: Props) => {
  const uniqueGenres = Array.from(
    new Set(movies?.map((movie: Tmovie) => movie.genre_id))
  );
  const moviesByGenre = uniqueGenres.slice(0, 3)?.map((genre) => ({
    genre,
    movies: movies.filter((movie: Tmovie) => movie.genre_id === genre),
  }));
  const settings = {
    slidesToShow: 4,
    arrows: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1049,
        settings: {
          slidesToShow: 3,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container text-white sm:pt-5 pt-5  sm:pl-1 sm:space-y-5 ">
      {moviesByGenre.map((genreGroup) => (
        <div key={genreGroup.genre}>
          <div
            className="sm:border-b-[0.2px] sm:border-gray-200 sm:pb-2 "
            key={genreGroup.genre}
          >
            <div className="flex items-center space-x-3 pl-4 md:px-4">
              <div className="h-[20px] w-[3px] bg-[#408bea]"></div>
              <h2 className="text-[20px] ">
                Phim{" "}
                {genreGroup?.genre && genreGroup?.genre?.length > 15
                  ? genreGroup.genre?.slice(0, 13) + "... "
                  : genreGroup.genre}{" "}
                mới cập nhật
              </h2>
            </div>
            <Slider
              className="mt-8 ml-4 sm:ml-4  md:ml-5 td:ml-2 lg:ml-4 mt:ml-4"
              {...settings}
            >
              {genreGroup.movies.map((movie: Tmovie) => (
                <div
                  key={movie.id}
                  className="xl:px-0 ml-0 md:ml-0 td:px-4 lg:px-0 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 hover:cursor-pointer 2xl:px-4"
                >
                  <Link
                    className="flex  flex-col items-center h-[210px] w-[110px] sm:h-[250px] sm:w-[140px]  mt:h-[300px] mt:w-[180px]  md:space-y-4 md:w-[150px] td:w-[167px] lg:w-[150px] mt:px-1 xl:w-[180px]"
                    to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
                    state={{ movie: movie }}
                  >
                    <img
                      className="sm:h-[180px] h-[150px] mt:h-[220px] td:h-[220px] lg:h-[200px] w-full object-cover"
                      src={movie.img_url}
                      alt={movie.title}
                    />
                    <div className="hidden mt:flex text-left w-full  flex-col">
                      <h3 className="text-base">
                        {movie.title.length > 20
                          ? movie.title.slice(0, 20).trim() + "..."
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
                    <div className=" text-left w-full  flex-col sm:hidden mt-3">
                      <h3 className="text-base text-nowrap">
                        {movie.title.length > 12
                          ? movie.title.slice(0, 12).trim() + "..."
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
                    <div className="hidden sm:flex mt:hidden text-left w-full  flex-col">
                      <h3 className="text-base">
                        {movie.title.length > 15
                          ? movie.title.slice(0, 15).trim() + "..."
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
                </div>
              ))}
            </Slider>
          </div>
          <div className="mx-3 sm:hidden">
            <Separator className="my-5 h-[0.07px] " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideConfig;
