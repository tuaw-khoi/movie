import { ReactElement, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tmovie } from "@/types/movie";
import "@/index.css";
import { Link } from "react-router-dom";
type Props = {
  topMovies: Tmovie[];
};
const Slide = ({ topMovies }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    appendDots: (dots: ReactElement[]) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1297,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          dots: true,
          infinite: true,
        },
      },
    ],
  };
  const [sliderKey, setSliderKey] = useState(0);

  useEffect(() => {
    setSliderKey((prevKey) => prevKey + 1);
  }, [topMovies]);

  return (
    <div className="slider-container text-white py-5 mt-3 sm:mt-0 md:mt-3 md:pl-3">
      <Slider key={sliderKey} {...settings}>
        {topMovies?.map((movie: Tmovie) => (
          <div
            key={movie.id}
            className="lg:px-4 mt:px-4 td:px-4 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 hover:cursor-pointer"
          >
            <Link
              to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
              state={{ movie: movie }}
              className="flex justify-center items-center w-full  md:w-[full]  td:w-[full]  lg:w-full bg-black relative"
            >
              <img
                src={movie.img_url}
                alt={movie.title}
                className="object-cover h-[175px] td:h-[170px] w-full "
              />
              <div className="absolute   flex flex-col left-8 mt:left-5 bottom-2  md:left-3 ">
                <h3 className="md:hidden text-xl font-bold">
                  {" "}
                  {movie.title.length > 20
                    ? movie.title.slice(0, 20).trim() + "..."
                    : movie.title}
                </h3>
                <h3 className="hidden md:block md:text-2xl text-xl font-bold">
                  {" "}
                  {movie.title.length > 15
                    ? movie.title.slice(0, 15).trim() + "..."
                    : movie.title}
                </h3>
                <p className="text-sm">{movie.release_year.slice(0, 4)}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slide;
