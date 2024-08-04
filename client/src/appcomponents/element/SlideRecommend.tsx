import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tmovie } from "@/types/movie";
import "@/slideConfig.css";
import { Link } from "react-router-dom";
import useMovies from "@/hooks/userMovie";
type Props = {
  movieDemo: Tmovie;
};
const SlideRecommend = ({ movieDemo }: Props) => {
  const { data } = useMovies();
  const settings = {
    slidesToShow: 4,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          dots: false,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: false,
          infinite: true,
        },
      },
    ],
  };
  const movies = data?.filter((movie: Tmovie) => {
    return movie.genre_id === movieDemo.genre_id && movie.id !== movieDemo.id;
  });
  return (
    <div className="slider-container text-white pt-5 xl:py-5   px-3 space-y-5 ">
      <Slider {...settings}>
        {movies?.slice(0, 10).map((movie: Tmovie) => (
          <div
            key={movie.id}
            className="2xl:px-4 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 hover:cursor-pointer "
          >
            <Link
              className="flex  flex-col items-center h-[170px] sm:h-[200px] xl:h-[280px] w-[120px] sm:w-[175px]  md:w-[140px] xl:w-[170px] space-y-4 "
              to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
              state={{ movie: movie }}
            >
              <img
                className="sm:h-[200px] xl:w-[210px] h-[170px] w-full object-cover"
                src={movie.img_url}
                alt={movie.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideRecommend;
