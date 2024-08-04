import { Button } from "@/components/ui/button";
import { Tmovie } from "@/types/movie";
import useMovies from "@/hooks/userMovie";

type Props = {
  movies: Tmovie[];
  handleTab: (movie: Tmovie) => void;
};

const MovieList = ({ movies, handleTab }: Props) => {
  const { deleteMovie } = useMovies();
  const handleEdit = (movie: Tmovie) => {
    handleTab(movie);
  };

  const handleDelete = (movie: Tmovie) => {
    alert("bạn muốn xóa chứ ");
    deleteMovie.mutate(movie);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-5 gap-x-3 sm:gap-x-5 gap-y-5 mt-5 ">
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className="w-full  space-y-2 relative transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
        >
          <img
            className="h-[150px] w-full  sm:w-[250px] object-cover cursor-pointer"
            src={movie.img_url}
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 gap-x-2">
            <Button
              onClick={() => handleEdit(movie)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Sửa
            </Button>
            <Button
              onClick={() => handleDelete(movie)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Xóa
            </Button>
          </div>
          <p className="">
            {movie.title.length > 17
              ? movie.title.slice(0, 17) + "..."
              : movie.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
