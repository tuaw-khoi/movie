import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import useUser from "@/hooks/useUser";
import Cookies from "js-cookie";
import useAuthenStore from "@/midlewares/authenStore";
const AccessPage = () => {
  const { setAuthen, setAuthentication } = useAuthenStore();
  const navigate = useNavigate();
  const { refreshLogin } = useUser();
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await refreshLogin();
      if (user.role === "1") {
        Cookies.set("user", JSON.stringify(user), {
          secure: true,
          sameSite: "strict",
          expires: 1,
        });
        navigate("/admin/settings");
      }
      if (user.role === "0") {
        setAuthen(true);
        setAuthentication("login");
        Cookies.set("user", JSON.stringify(user), {
          secure: true,
          sameSite: "strict",
          expires: 1,
        });
      }
    };
    fetchUserData();
  }, []);

  return <Layout />;
};

export default AccessPage;
