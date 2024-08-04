import { Button } from "@/components/ui/button";
import MovieList from "../../adminElement/MovieList";
import useMovies from "@/hooks/userMovie";
import { useState } from "react";
import { Tmovie } from "@/types/movie";
import CreateMovieForm from "./createmovie-form";

const ManagementMovie = () => {
  const { data } = useMovies();
  const [movieTab, setMovieTab] = useState<Tmovie | null | boolean>(null); // Chỉnh sửa ở đây
  const handleMovieTab = (movie: Tmovie) => {
    setMovieTab(movie);
  };
  const handleGoBack = () => {
    setMovieTab(null);
  };
  const hanldeAddMovie = () => {
    setMovieTab(true);
  };
  return (
    <div>
      {movieTab ? (
        <>
          <Button onClick={handleGoBack}>Trở Lại</Button>
          <div className="mt-5">
            <CreateMovieForm
              movie={movieTab === true ? null : movieTab}
              hanldeGoBack={handleGoBack}
            />
          </div>
        </>
      ) : (
        <>
          <Button onClick={hanldeAddMovie}>Thêm Phim</Button>
          <MovieList movies={data} handleTab={handleMovieTab} />
        </>
      )}
    </div>
  );
};

export default ManagementMovie;
