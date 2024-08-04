import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Users from "../element/Users";
import useGenres from "@/hooks/useGenre";
import useCountrys from "@/hooks/useCountry";
import { Tgenre } from "@/types/genre";
import { Tcountry } from "@/types/country";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconCaretRight } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Menu from "../element/Menu";
const formSchema = z.object({
  searchmovie: z.string().min(0, {}),
});
export type Ttab = "genre" | "country" | null;
const Header = () => {
  const navigate = useNavigate();
  const { data: genres } = useGenres();
  const { data: countrys } = useCountrys();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTab, setShowtab] = useState<Ttab>();
  const handleCloseOverlay = () => {
    setShowtab(null);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const closeTab = () => {
    setShowtab(null);
  };
  const opentab = (tab: Ttab) => {
    setShowtab(tab);
  };
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchmovie: "",
    },
  });
  const onSubmit = async (data: any) => {
    const search = data?.searchmovie;
    console.log(search);
    navigate(`/search/${search || ""}`);
  };
  return (
    <div>
      <div className="w-full bg-[#10131a] h-[80px] md:h-[100px] flex items-center container justify-between ">
        <Menubar className=" ml-[-37px] bg-[#10131a] text-white border-0 rounded-none">
          <MenubarMenu>
            <Link to={""}>
              <img
                className="w-[180px] md:w-[250px]"
                src="https://res.cloudinary.com/dfua5nwki/image/upload/v1714834452/imgmovie/logo_umssxj.svg"
                alt=""
              />
            </Link>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hidden md:flex focus:bg-[#10131a] data-[state=open]:bg-[#10131a] data-[state=open]:text-white">
              <Link
                className="whitespace-nowrap"
                to={`/movies/more/${"newmovies"}`}
              >
                Phim Mới
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden md:flex focus:bg-[#10131a] cursor-pointer focus:text-white data-[state=open]:bg-[#10131a] data-[state=open]:text-white whitespace-nowrap"
            >
              Thể Loại
              <IconChevronDown className="ml-1" stroke={2} width={20} />
            </MenubarTrigger>
            {isMenuOpen ? (
              <MenubarContent className="bg-black-t-50  text-gray-300 grid grid-cols-3 pl-3 gap-y-1  border-none rounded-none p-5">
                {genres?.map((genre: Tgenre) => (
                  <Link
                    key={genre.id}
                    to={`/movies/more/${genre.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                    className="w-48 hover:text-[#408bea]"
                    onClick={closeMenu}
                  >
                    <div className="flex">
                      <IconCaretRight stroke={2} />
                      {genre.name}
                    </div>
                  </Link>
                ))}
              </MenubarContent>
            ) : (
              ""
            )}
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden md:flex focus:bg-bg-[#10131a] cursor-pointer focus:text-white data-[state=open]:bg-[#10131a] data-[state=open]:text-white whitespace-nowrap"
            >
              Quốc Gia
              <IconChevronDown className="ml-1" stroke={2} width={20} />
            </MenubarTrigger>
            {isMenuOpen ? (
              <MenubarContent className="bg-black-t-50  text-gray-300 grid grid-cols-3 pl-3 gap-y-1  border-none rounded-none p-3">
                {countrys?.map((country: Tcountry) => (
                  <Link
                    key={country.id}
                    to={`/movies/more/${country.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                    className="w-32 hover:text-[#408bea]"
                    onClick={closeMenu}
                  >
                    <div className="flex">
                      <IconCaretRight stroke={1} />
                      {country.name}
                    </div>
                  </Link>
                ))}
              </MenubarContent>
            ) : (
              ""
            )}
          </MenubarMenu>
        </Menubar>
        <div className="hidden mt:flex md:flex space-x-5 items-center">
          <div className="hidden sm:flex w-full  items-center space-x-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-x-2 flex"
              >
                <FormField
                  control={form.control}
                  name="searchmovie"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="min-w-[18px]"
                          type="text"
                          placeholder="Tên Phim"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-yellow-500 min-w-20 hover:bg-[#408bea]"
                  type="submit"
                >
                  Tìm Kiếm
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt:hidden md:block">
            <Users />
          </div>
        </div>
        <div className=" md:hidden">
          <Menu openTab={opentab} />
        </div>
      </div>
      {showTab ? (
        <div className="fixed inset-0 z-40" onClick={handleCloseOverlay}>
          <div className="md:hidden mt-[81px] bg-[#10131a]">
            {showTab === "genre" ? (
              <div className="text-white w-full ">
                {genres?.map((genre: Tgenre) => (
                  <Link
                    key={genre.id}
                    to={`/movies/more/${genre.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                    className="w-36 hover:text-[#408bea] h-5 "
                    onClick={closeTab}
                  >
                    <div className="flex  hover:text-[#408bea]  border-b pl-5 py-2">
                      <IconCaretRight stroke={2} />
                      {genre.name}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-white   w-full ">
                {countrys?.map((country: Tcountry) => (
                  <Link
                    key={country.id}
                    to={`/movies/more/${country.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                    className="w-32 hover:text-[#408bea] h-5"
                    onClick={closeTab}
                  >
                    <div className="flex  hover:text-[#408bea]  border-b pl-5 py-2">
                      <IconCaretRight stroke={1} />
                      {country.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
