import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListOfJuzs() {
  const [times, setTimes] = useState(1);

  const [juzsInfo, setJuzsInfo] = useState([
    { title: "الجزء الأول", page: 1 },
    { title: "الجزء الثاني", page: 2 },
    { title: "الجزء الثالث", page: 3 },
    { title: "الأول الرابع", page: 4 },
    { title: "الجزء الخامس", page: 5 },
    { title: "الجزء السادس", page: 6 },
    { title: "الجزء السابع", page: 7 },
    { title: "الجزء الثامن", page: 8 },
    { title: "الجزء التاسع", page: 9 },
    { title: "الجزء العاشر", page: 10 },
    { title: "الجزء الحادي عشر", page: 11 },
    { title: "الجزء الثاني عشر", page: 12 },
    { title: "الجزء الثالث عشر", page: 13 },
    { title: "الجزء الرابع عشر", page: 14 },
    { title: "الجزء الخامس عشر", page: 15 },
    { title: "الجزء السادس عشر", page: 16 },
    { title: "الجزء السابع عشر", page: 17 },
    { title: "الجزء الثامن عشر", page: 18 },
    { title: "الجزء التاسع عشر", page: 19 },
    { title: "الجزء العشرون", page: 20 },
    { title: "الجزء الحادي و العشرون", page: 21 },
    { title: "الجزء الثاني و العشرون", page: 22 },
    { title: "الجزء الثالث و العشرون", page: 23 },
    { title: "الجزء الرابع و العشرون", page: 24 },
    { title: "الجزء الخامس و العشرون", page: 25 },
    { title: "الجزء السادس و العشرون", page: 26 },
    { title: "الجزء السابع و العشرون", page: 27 },
    { title: "الجزء الثامن و العشرون", page: 28 },
    { title: "الجزء التاسع و العشرون", page: 29 },
    { title: "الجزء الثلاثون", page: 30 },
  ]);

  useEffect(() => {
    if (localStorage.getItem(`juzs`)) {
      setJuzsInfo(JSON.parse(localStorage.getItem(`juzs`)));
    } else {
      if (times <= 30) {
        const fetchJuzs = async () => {
          let res = await fetch(`//api.alquran.cloud/v1/juz/${times}`);
          const data = await res.json();

          setJuzsInfo((curr) => {
            return curr.map((el, index) => {
              if (index + 1 === times) {
                return { ...el, page: data.data.ayahs[0].page };
              } else {
                return el;
              }
            });
          });
        };
        setTimes(times + 1);
        fetchJuzs();
      }
    }
  }, [times]);

  useEffect(() => {
    if (juzsInfo[29].page === 582) {
      localStorage.setItem(`juzs`, JSON.stringify(juzsInfo));
    }
  }, [juzsInfo]);

  return (
    <>
      <ul className={`flex flex-col items-center h-fit`}>
        {juzsInfo[29].page == 582 ? (
          juzsInfo.map((juzInfo) => {
            return (
              <>
                <li
                  key={juzInfo.page}
                  className={`w-full text-center sm:text-3xl text-xl text-primary-white hover:bg-[#172236] transition bg-[#121C34] ${
                    juzInfo.page < 582 && "border-b"
                  }`}
                >
                  <Link
                    to={`/quran/page/${juzInfo.page}`}
                    className="w-full h-full block py-3"
                  >
                    {juzInfo.title}
                  </Link>
                </li>
              </>
            );
          })
        ) : (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin text-4xl w-full text-center mt-10 text-white "
          />
        )}
      </ul>
    </>
  );
}
