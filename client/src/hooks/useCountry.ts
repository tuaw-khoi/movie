import AxiosClient from "@/service/AxiosClient";
import { Tcountry } from "@/types/country";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useCountrys = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["countrys"],
    queryFn: async () => {
      const response = await AxiosClient.get("country");
      return response.data.data;
    },
  });

  const deleteCountry = useMutation({
    mutationFn: async (id: string) => {
      return AxiosClient.delete(`country/deleteCountry?CountryId=${id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["countrys"] });
    },
  });

  const addCountry = useMutation({
    mutationFn: async (country: Tcountry) => {
      return AxiosClient.post(`/country/createCountry`, country);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["countrys"] });
    },
  });

  const updateCountry = async (id: string, country: Tcountry) => {
    await AxiosClient.post(`country/updateCountry?CountryId=${id}`, country);
    queryClient.invalidateQueries({ queryKey: ["countrys"] });
  };
  return { data, deleteCountry, addCountry, updateCountry };
};

export default useCountrys;
