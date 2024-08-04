import Genre from "../../adminElement/Genre";
import Country from "../../adminElement/Country";
import { useState } from "react";
import useGenres from "@/hooks/useGenre";
import useCountrys from "@/hooks/useCountry";

export default function CreateMore() {
  const [tab, setTab] = useState("genre");
  const { data: genres } = useGenres();
  const { data: countrys } = useCountrys();
  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };
  if (!genres) {
    return <div>Loading...</div>;
  }
  if (!countrys) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div className=" space-x-5">
        <button
          className="bg-green-500 rounded-lg py-2 px-3"
          onClick={() => handleChangeTab("genre")}
        >
          Thể Loại
        </button>
        <button
          className="bg-yellow-500 rounded-lg py-2 px-3"
          onClick={() => handleChangeTab("country")}
        >
          Quốc Gia
        </button>
      </div>
      <div className="shadow-sm">
        {tab === "genre" ? (
          <Genre data={genres} />
        ) : (
          <Country data={countrys} />
        )}
      </div>
    </div>
  );
}
