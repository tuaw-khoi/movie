import { IconMenu2 } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LifeBuoy, Settings } from "lucide-react";
import { useState } from "react";
import { Ttab } from "../Layout/Header";
type Props = {
  openTab: (name: Ttab) => void;
};
const Menu = ({ openTab }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const openShowTab = (name: Ttab) => {
    openTab(name);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)} asChild>
          <div className="">
            <IconMenu2 stroke={2} color="white" />
          </div>
        </DropdownMenuTrigger>
        {isMenuOpen ? (
          <DropdownMenuContent className="w-56 mr-7">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link
                  onClick={closeMenu}
                  className="w-full text-sm cursor-pointer"
                  to={`/movies/more/${"newmovies"}`}
                >
                  Phim Mới
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <LifeBuoy className="mr-2 h-4 w-4 " />
                <span
                  className="w-full cursor-pointer"
                  onClick={() => openShowTab("genre")}
                >
                  Thể Loại
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span
                  className="w-full cursor-pointer"
                  onClick={() => openShowTab("country")}
                >
                  Quốc Gia
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        ) : (
          ""
        )}
      </DropdownMenu>
    </div>
  );
};

export default Menu;
