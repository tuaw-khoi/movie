import useMovies from "@/hooks/userMovie";
import { Tmovie } from "@/types/movie";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/index.css";
const formSchema = z.object({
  searchmovie: z.string().min(0, {}),
});
const SearchMovie = () => {
  const location = useLocation();
  const { keyword } = useParams();
  const { data: movies } = useMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (movies && keyword) {
      const filtered = movies.filter((movie: Tmovie) =>
        movie?.title?.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(keyword ? [] : movies);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, movies, keyword]);
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchmovie: "",
    },
  });
  const onSubmit = async (data: any) => {
    const search = data?.searchmovie;
    console.log(search);
    navigate(`/search/${search || ""}`);
  };
  return (
    <div className="w-full flex justify-center mt-20">
      <div className="flex flex-col min-w-[600px] max-w-[600px] space-y-3">
        <div className="flex items-center space-x-3  ">
          <div className="h-[20px] w-[3px] bg-[#408bea]"></div>
          <h2 className="text-[22px] ">Kết quả tìm kiếm:</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-x-2 flex w-full"
          >
            <FormField
              control={form.control}
              name="searchmovie"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      className="text-black w-full" // Đảm bảo rằng input này có `w-full`
                      type="text"
                      placeholder="Tên Phim"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="bg-yellow-500 hover:bg-[#408bea]" type="submit">
              Tìm Kiếm
            </Button>
          </form>
        </Form>
        {filteredMovies && filteredMovies.length > 0 ? (
          <div className="">
            {filteredMovies.slice(0, 10).map((movie: Tmovie) => (
              <div className="py-5 border-b border-gray-400">
                <Link
                  className="flex items-center h-[120px] w-full  transition ease-in-out space-x-5 hover-blur-effect"
                  to={`/movies/${movie.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
                  state={{ movie: movie }}
                  key={movie.id}
                >
                  <div className="w-[150px]">
                    <img
                      className="h-[120px] w-full object-cover movie-img"
                      src={movie.img_url}
                      alt={movie.title}
                    />
                  </div>
                  <div className="text-left  w-full flex flex-col space-y-1 h-full">
                    <h3 className="text-base ">
                      {movie.title.length > 30
                        ? movie.title.slice(0, 30).trim() + "..."
                        : movie.title}
                    </h3>
                    <div className=" text-yellow-500 text-sm">
                      <span>{movie.release_year.slice(0, 4)}</span>
                    </div>
                    <p className="text-wrap text-sm text-gray-400 pt-1">
                      {movie.description.length > 100
                        ? movie.description.slice(0, 100).trim() + "..."
                        : movie.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Không có kết quả nào để hiển thị với '{keyword}'.</p>
            <div>
              <span>Gợi ý:</span>
              <ul>
                <li> Hãy chắc chắn rằng tất cả các từ đều đúng chính tả.</li>
                <li> Hãy thử các từ khóa khác nhau. </li>
                <li>Thử những từ khóa thông thường hơn.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovie;
