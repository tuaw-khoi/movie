import { useLocation } from "react-router-dom";
export default function useCheckActiveNav() {
  const { pathname } = useLocation();

  const checkActiveNav = (href: string) => {
    const currentPath = pathname
      .split("/")
      .filter((item) => item !== "")
      .pop();
    const lastHrefPart = href
      .split("/")
      .filter((item) => item !== "")
      .pop();

    // Kiểm tra nếu currentPath và lastHrefPart khớp nhau
    return currentPath === lastHrefPart;
  };

  return { checkActiveNav };
}
