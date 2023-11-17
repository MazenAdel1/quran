import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListOfSurahs() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch(`//api.alquran.cloud/v1/surah`)
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
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
                to={`/${surah.englishName}`}
                key={surah.number}
                className={`flex justify-between items-center relative w-full sm:px-10 px-3 py-4 text-primary-white hover:bg-[#172236] transition bg-[#121C34] ${
                  surah.number < 114 && "border-b"
                }`}
              >
                <span className="text-base">{surah.number}</span>
                <h2 className="sm:text-2xl text-xl">
                  {surah.name}{" "}
                  <span className="text-xs">[{surah.numberOfAyahs} آية]</span>
                </h2>
                <h3 className="text-lg">
                  {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
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
