import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListOfSurahs() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem(`surahs`)) {
      setSurahs(JSON.parse(localStorage.getItem(`surahs`)));
    } else {
      fetch(`https://api.quran.com/api/v4/chapters`)
        .then((res) => res.json())
        .then((data) => setSurahs(data.chapters));
    }
  }, []);

  useEffect(() => {
    if (surahs.length === 114) {
      localStorage.setItem(`surahs`, JSON.stringify(surahs));
    }
  }, [surahs]);

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="w-full">
          <ul className="flex w-full justify-between bg-secondary p-1 text-lg text-black sm:px-5 sm:py-2 sm:text-2xl">
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
                className={`relative flex w-full items-center justify-between bg-[#121C34] px-3 py-4 text-primary-white transition hover:bg-[#172236] sm:px-10 ${
                  surah.id < 114 && "border-b"
                }`}
              >
                <span className="text-base">{surah.id}</span>
                <h2 className="text-xl sm:text-2xl">
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
            className="mt-10 w-full animate-spin text-center text-4xl text-primary-white"
          />
        )}
      </section>
    </>
  );
}
