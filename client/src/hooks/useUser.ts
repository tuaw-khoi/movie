import Cookies from "js-cookie";
import useAuthenStore from "@/midlewares/authenStore";
import AxiosClient from "@/service/AxiosClient";
import { TUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useUser = () => {
  const queryClient = useQueryClient();
  const { setIsAdmin, setAuthen, setAuthentication } = useAuthenStore();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await AxiosClient.get("user");
      return response.data.data;
    },
  });

  const login = useMutation({
    mutationFn: async (user: TUser) => {
      const response = await AxiosClient.post("/user/login", user);
      return response.data;
    },

    onSuccess: async (data) => {
      const token = data.token;
      const user = data.user;
      Cookies.set("token", token, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });
      if (!token) {
        throw new Error("Missing token in login response");
      }
      if (user.role == "1") {
        setIsAdmin(1);
      } else {
        setAuthen(true);
        setAuthentication("login");
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const register = useMutation({
    mutationFn: async (user: TUser) => {
      const { fullName, password, email, username } = user;
      const newUser = { fullName, password, email, username };
      const response = await AxiosClient.post("/user/register", newUser);
      return response.data;
    },

    onSuccess: () => {
      setAuthentication("register");
    },

    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });
  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      return AxiosClient.delete(`user/deleteUser?UserIds=${id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const updateUser = async (user: TUser, id: string) => {
    await AxiosClient.post(`user/updateUser`, {
      UserId: id,
      ...user,
    });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  const changePassword = useMutation({
    mutationFn: async ({
      userId,
      oldPassword,
      newPassword,
    }: {
      userId: string;
      oldPassword: string;
      newPassword: string;
    }) => {
      const response = await AxiosClient.post("/user/updatePassword", {
        userId,
        oldPassword,
        newPassword,
      });
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error: any) => {},
  });
  const refreshLogin = async () => {
    try {
      const response = await AxiosClient.get(`user/refreshLogin`);
      return response?.data?.user;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  return {
    login,
    register,
    data,
    deleteUser,
    updateUser,
    refreshLogin,
    changePassword,
  };
};

export default useUser;
