import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import useGenres from "@/hooks/useGenre";
import useCountrys from "@/hooks/useCountry";
import { Tgenre } from "@/types/genre";
import { Tcountry } from "@/types/country";
import { z } from "zod";
import useMovies from "@/hooks/userMovie";
import { Tmovie } from "@/types/movie";
const movieFormSchema = z.object({
  title: z.string().min(2, {
    message: "Movie name must be at least 2 characters.",
  }),
  release_year: z.string().min(4, {
    message: "release year must be at least 4 characters.",
  }),

  genre_id: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),

  country_id: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  // img_url: z
  //   .any()
  //   .optional()
  //   .refine(
  //     (file) => {
  //       if (!file) return true;
  //       return (
  //         file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)
  //       );
  //     },
  //     {
  //       message:
  //         "Max image size is 5MB and only .jpg, .jpeg, .png and .webp formats are supported.",
  //       path: ["img_url"],
  //     }
  //   ),
  img_url: z.any(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),

  runtime: z.string().min(1, {
    message: "runtime must be at least 1 minutes.",
  }),

  trailer_url: z.string().url({
    message: "Please enter a valid trailer URL.",
  }),

  moviesUrl: z.string().url({
    message: "Please enter a valid movie URL.",
  }),

  directors: z.string().min(2, {
    message: "Director's name must be at least 2 characters.",
  }),

  actor: z.string().min(2, {
    message: "Actor's name must be at least 2 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof movieFormSchema>;
type Props = {
  movie: Tmovie | null;
  hanldeGoBack: () => void;
};
export default function CreateMovieForm({ movie, hanldeGoBack }: Props) {
  const { data: genres } = useGenres();
  const { data: countrys } = useCountrys();
  const selectedGenre =
    movie && genres
      ? genres.find((genre: Tgenre) => genre.name === movie.genre_id)
      : null;
  const selectedCountry =
    movie && countrys
      ? countrys.find((country: Tcountry) => country.name === movie.country_id)
      : null;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(movieFormSchema),
    mode: "onChange",
    defaultValues: {
      title: movie?.title || "",
      release_year: movie?.release_year.slice(0, 4),
      genre_id: selectedGenre?.id || "",
      country_id: selectedCountry?.id || "",
      img_url: movie?.img_url,
      description: movie?.description || "",
      runtime: movie?.runtime?.toString() || "",
      trailer_url: movie?.trailer_url || "",
      moviesUrl: movie?.moviesUrl_id || "",
      directors: movie?.directors || "",
      actor: movie?.actor || "",
    },
  });
  const { addMovie, updateMovie } = useMovies();
  function onSubmit(data: ProfileFormValues) {
    const movieData: Tmovie = {
      id: movie?.id || "",
      title: data.title,
      release_year: data.release_year,
      genre_id: data.genre_id,
      country_id: data.country_id,
      moviesUrl_id: data.moviesUrl,
      description: data.description,
      runtime: parseInt(data.runtime),
      trailer_url: data.trailer_url,
      img_url: data.img_url,
      directors: data.directors,
      actor: data.actor,
    };
    console.log(movieData);
    if (movie) {
      updateMovie(movieData);
      alert("sửa thành công");
    } else {
      addMovie.mutate(movieData);
      alert("thêm thành công");
    }
    hanldeGoBack();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Phim</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên phim" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Năm sản xuất</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nhập năm sản xuất" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thể Loại</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thể loại phim" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {genres &&
                    genres.map((genre: Tgenre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quốc Gia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quốc gia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countrys &&
                    countrys.map((country: Tcountry) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô Tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả phim"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời Gian</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Nhập thời gian của phim"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailer_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailer</FormLabel>
              <FormControl>
                <Input placeholder="Nhập link trailer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {movie ? (
          <img
            className="h-[150px] w-[250px] object-cover cursor-pointer"
            src={movie.img_url}
            alt=""
          />
        ) : (
          ""
        )}
        <FormField
          control={form.control}
          name="img_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thay ảnh khác nếu bạn muốn</FormLabel>
              <FormControl>
                <Input
                  className="hover:cursor-pointer"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moviesUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Phim</FormLabel>
              <FormControl>
                <Input placeholder="Nhập link phim" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="actor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diễn Viên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên diễn viên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="directors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đạo Diễn</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên đạo diễn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{movie ? "Sửa Phim" : "Tạo Phim"}</Button>
      </form>
    </Form>
  );
}
