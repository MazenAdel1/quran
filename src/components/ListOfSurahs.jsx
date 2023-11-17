import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListOfSurahs() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch(`https://api.quran.com/api/v4/chapters`)
      .then((res) => res.json())
      .then((data) => setSurahs(data.chapters));
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="w-full">
          <ul className="w-full flex justify-between bg-secondary sm:px-5 sm:py-2 p-1 sm:text-2xl text-lg text-black">
            <li>رقم السورة</li>
            <li>السورة</li>
            <li>مكان النزول</li>
          </ul>
        </div>
        {surahs.length === 114 ? (
          surahs.map((surah) => {
            return (
              <Link
                to={`/quran/page/${surah.pages[0]}`}
                key={surah.name_simple}
                className={`flex justify-between items-center relative w-full sm:px-10 px-3 py-4 text-primary-white hover:bg-[#172236] transition bg-[#121C34] ${
                  surah.id < 114 && "border-b"
                }`}
              >
                <span className="text-base">{surah.id}</span>
                <h2 className="sm:text-2xl text-xl">
                  سورة {surah.name_arabic}{" "}
                  <span className="text-xs">[{surah.verses_count} آية]</span>
                </h2>
                <h3 className="text-lg">
                  {surah.revelation_place === "makkah" ? "مكية" : "مدنية"}
                </h3>
              </Link>
            );
          })
        ) : (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin text-4xl w-full text-center mt-10 text-primary-white"
          />
        )}
      </section>
    </>
  );
}
