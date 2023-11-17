import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListOfJuzs() {
  const [times, setTimes] = useState(1);

  const [juzsInfo, setJuzsInfo] = useState([
    { title: "الجزء الأول", page: 1, index: 1 },
    { title: "الجزء الثاني", page: 2, index: 2 },
    { title: "الجزء الثالث", page: 3, index: 3 },
    { title: "الأول الرابع", page: 4, index: 4 },
    { title: "الجزء الخامس", page: 5, index: 5 },
    { title: "الجزء السادس", page: 6, index: 6 },
    { title: "الجزء السابع", page: 7, index: 7 },
    { title: "الجزء الثامن", page: 8, index: 8 },
    { title: "الجزء التاسع", page: 9, index: 9 },
    { title: "الجزء العاشر", page: 10, index: 10 },
    { title: "الجزء الحادي عشر", page: 11, index: 11 },
    { title: "الجزء الثاني عشر", page: 12, index: 12 },
    { title: "الجزء الثالث عشر", page: 13, index: 13 },
    { title: "الجزء الرابع عشر", page: 14, index: 14 },
    { title: "الجزء الخامس عشر", page: 15, index: 15 },
    { title: "الجزء السادس عشر", page: 16, index: 16 },
    { title: "الجزء السابع عشر", page: 17, index: 17 },
    { title: "الجزء الثامن عشر", page: 18, index: 18 },
    { title: "الجزء التاسع عشر", page: 19, index: 19 },
    { title: "الجزء العشرون", page: 20, index: 20 },
    { title: "الجزء الحادي و العشرون", page: 21, index: 21 },
    { title: "الجزء الثاني و العشرون", page: 22, index: 22 },
    { title: "الجزء الثالث و العشرون", page: 23, index: 23 },
    { title: "الجزء الرابع و العشرون", page: 24, index: 24 },
    { title: "الجزء الخامس و العشرون", page: 25, index: 25 },
    { title: "الجزء السادس و العشرون", page: 26, index: 26 },
    { title: "الجزء السابع و العشرون", page: 27, index: 27 },
    { title: "الجزء الثامن و العشرون", page: 28, index: 28 },
    { title: "الجزء التاسع و العشرون", page: 29, index: 29 },
    { title: "الجزء الثلاثون", page: 30, index: 30 },
  ]);

  useEffect(() => {
    if (times <= 30) {
      const fetchJuzs = async () => {
        let res = await fetch(`http://api.alquran.cloud/v1/juz/${times}`);
        const data = await res.json();

        setJuzsInfo((curr) => {
          return curr.map((el) => {
            if (el.index === times) {
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
  }, [times]);

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
                    to={`/page/${juzInfo.page}`}
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
