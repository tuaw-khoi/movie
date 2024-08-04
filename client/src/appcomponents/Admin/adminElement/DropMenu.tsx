import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import GenreForm from "./GenreForm";
import { Tgenre } from "@/types/genre";
import CountryForm from "./CountryForm";
type Props = {
  row?: Tgenre;
  tab: string;
  type: string;
};
const DropMenu = ({ row, tab, type }: Props) => {
  const [formGenre, setFormGenre] = useState(true);
  const handleCloseForm = () => {
    setFormGenre(false);
  };
  const handleOpenForm = () => {
    setFormGenre(true);
  };
  return (
    <div>
      {type === "genre" ? (
        <div>
          {tab === "add" ? (
            <GenreForm
              tab={tab}
              id={row?.id}
              name={row?.name}
              closeForm={handleCloseForm}
            />
          ) : (
            ""
          )}
          {tab === "edit" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={handleOpenForm}
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {formGenre ? (
                <DropdownMenuContent align="end">
                  <GenreForm
                    tab={tab}
                    id={row?.id}
                    name={row?.name}
                    closeForm={handleCloseForm}
                  />
                </DropdownMenuContent>
              ) : (
                ""
              )}
            </DropdownMenu>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {tab === "add" ? (
            <CountryForm
              tab={tab}
              id={row?.id}
              name={row?.name}
              closeForm={handleCloseForm}
            />
          ) : (
            ""
          )}
          {tab === "edit" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={handleOpenForm}
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {formGenre ? (
                <DropdownMenuContent align="end">
                  <CountryForm
                    tab={tab}
                    id={row?.id}
                    name={row?.name}
                    closeForm={handleCloseForm}
                  />
                </DropdownMenuContent>
              ) : (
                ""
              )}
            </DropdownMenu>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default DropMenu;
