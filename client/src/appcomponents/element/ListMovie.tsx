import useMovies from "@/hooks/userMovie";
import Slide from "./Slide";
import SlideConfig from "./SlideConfig";
import MobileNav from "./MobileNav";
const ListMovie = () => {
  const { data: movies } = useMovies();
  const topMovies = movies?.slice(0, 4);
  const movieGenre = movies?.slice(9);

  return (
    <div>
      <div className="md:hidden ">
        <MobileNav />
      </div>
      <Slide topMovies={topMovies} />
      <div>
        <SlideConfig movies={movieGenre} />
      </div>
    </div>
  );
};

export default ListMovie;
