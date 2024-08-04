import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import ManagerAccount from "./element/ManagerAccount";
import useAuthenStore from "@/midlewares/authenStore";
import Cookies from "js-cookie";
const AccessAccount = () => {
  const navigate = useNavigate();
  const { refreshLogin } = useUser();
  const { setAuthen, setAuthentication } = useAuthenStore();
  useEffect(() => {
    let canceled = false;

    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const user = await refreshLogin();
        if (canceled) return;

        Cookies.set("user", JSON.stringify(user), {
          secure: true,
          sameSite: "strict",
          expires: 1,
        });

        if (user) {
          setAuthen(true);
          setAuthentication("login");
          navigate("/proflier");
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

  return <ManagerAccount />;
};

export default AccessAccount;
