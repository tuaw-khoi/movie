import { Separator } from "@/components/ui/separator";
import useCountrys from "@/hooks/useCountry";
import useGenres from "@/hooks/useGenre";
import { Tcountry } from "@/types/country";
import { Tgenre } from "@/types/genre";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
  IconCircleArrowUpFilled,
  IconCopyright,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { data: genres } = useGenres();
  const { data: countrys } = useCountrys();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="lg:container ">
      <div className="bg-[#10131a] md:border-t-[1px] md:mt-[-1.25px] md:border-gray-300 ">
        <div className="flex justify-center items-center w-full text-white md:mt-5">
          <div className="w-1/3 mt-[-20px] hidden md:block">
            <img
              className="h-[100px] w-[250px] object-cover"
              src="https://res.cloudinary.com/dfua5nwki/image/upload/v1714834452/imgmovie/logo_umssxj.svg"
              alt="Tv Phim"
            />
            <p className="px-8 mt-[-10px] text-gray-300 text-sm hidden md:block">
              <Link className="text-[#408bea] " onClick={scrollToTop} to={"/"}>
                {"Tv Phim "}
              </Link>
              - Trang xem phim trực tuyến miễn phí tại Vietnam. Tại đây các bạn
              có thể tìm kiếm những bộ phim mà mình yêu thích với hơn hàng nghìn
              bộ phim mới được cập nhật thường xuyên.
            </p>
          </div>
          <div className="w-2/3 flex justify-center space-x-36 md:space-x-14 xl:space-x-36 mt-5">
            <div className=" flex-col hidden md:flex">
              <h3 className="text-white text-lg mb-2">Phim Mới</h3>
              {countrys?.slice(0, 5).map((country: Tcountry) => (
                <Link
                  to={`/movies/more/${country.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-[#408bea] py-1 text-sm"
                  key={country.id}
                >
                  Phim {country.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex flex-col">
              <h3 className="text-white text-lg mb-2 ">Phim Hay</h3>

              {genres?.slice(0, 5).map((genre: Tgenre) => (
                <Link
                  to={`/movies/more/${genre.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-[#408bea] py-1 text-sm"
                  key={genre.id}
                >
                  Phim {genre.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex md:flex-col">
              <h3 className="text-white text-lg mb-2">Thông Tin </h3>
              <Link className="text-[#408bea] py-1 text-sm" to={"#"}>
                Liên hệ
              </Link>
              <Link className="text-[#408bea] py-1 text-sm" to={"#"}>
                Về Chúng Tôi
              </Link>
              <Link className="text-[#408bea] py-1 text-sm" to={"#"}>
                Điều khoản sử dụng
              </Link>
              <Link className="text-[#408bea] py-1 text-sm" to={"#"}>
                Vấn đề bản quyền
              </Link>
              <Link className="text-[#408bea] py-1 text-sm" to={"#"}>
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:px-8 md:mt-8">
          <Separator className="" />
        </div>
        <div className="text-gray-300 py-10 flex justify-between items-center md:px-16 ">
          <div className=" flex">
            <IconCopyright stroke={1.5} />
            Tv Phim
          </div>
          <div className=" divide-x flex ">
            <IconBrandFacebookFilled className="cursor-pointer w-9 px-2" />
            <IconBrandTwitterFilled className="cursor-pointer w-9 px-2" />
            <IconBrandInstagram
              className="cursor-pointer w-9 px-2"
              stroke={1}
            />
            <IconBrandYoutubeFilled className="cursor-pointer w-9 px-2" />
            <IconCircleArrowUpFilled
              onClick={scrollToTop}
              className="cursor-pointer w-10 px-2 bg-yellow-500 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
