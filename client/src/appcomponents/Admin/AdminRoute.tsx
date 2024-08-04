import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppShell from "@/components/ui/app-shell";
import useUser from "@/hooks/useUser";
import useAuthenStore from "@/midlewares/authenStore";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { refreshLogin } = useUser();
  const { setAuthen, setAuthentication } = useAuthenStore();
  useEffect(() => {
    let canceled = false;
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/");
      }
      try {
        const user = await refreshLogin();
        if (canceled) return;
        if (user.role !== "1") {
          navigate("/");
          return;
        }
        Cookies.set("user", JSON.stringify(user), {
          secure: true,
          sameSite: "strict",
          expires: 1,
        });
        if (user.role === "0") {
          setAuthen(true);
          setAuthentication("login");
          navigate("/");
        }
      } catch (error) {
        if (canceled) return;
      }
    };
    fetchUserData();
    return () => {
      canceled = true;
    };
  }, []);
  return <AppShell />;
};

export default AdminRoute;
