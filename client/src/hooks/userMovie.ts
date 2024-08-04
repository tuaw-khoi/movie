import AxiosClient from "@/service/AxiosClient";
import { Tmovie } from "@/types/movie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useMovies = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await AxiosClient.get("movie");
      return response.data.data;
    },
  });

  const deleteMovie = useMutation({
    mutationFn: async (movie: Tmovie) => {
      return AxiosClient.delete(`movie/deleteMovie?id=${movie.id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const addMovie = useMutation({
    mutationFn: async (movie: Tmovie) => {
      return AxiosClient.post(`/movie/createMovie`, movie, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const updateMovie = async (movie: Tmovie) => {
    await AxiosClient.post(`movie/updateMovie`, movie, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["movies"] });
  };
  return { data, addMovie, updateMovie, deleteMovie };
};

export default useMovies;
