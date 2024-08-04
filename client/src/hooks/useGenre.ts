import AxiosClient from "@/service/AxiosClient";
import { Tgenre } from "@/types/genre";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useGenres = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await AxiosClient.get("genre");
      return response.data.data;
    },
  });

  const deleteGenre = useMutation({
    mutationFn: async (id: string) => {
      return await AxiosClient.delete(`genre/deleteGenres?GenresId=${id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const addGenre = useMutation({
    mutationFn: async (genre: Tgenre) => {
      return AxiosClient.post(`genre/createGenres`, genre);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const updateGenre = async (id: string, genre: string) => {
    await AxiosClient.post(`genre/updateGenres?GenresId=${id}`, genre);
    queryClient.invalidateQueries({ queryKey: ["genres"] });
  };
  return { data, deleteGenre, updateGenre, addGenre };
};

export default useGenres;
