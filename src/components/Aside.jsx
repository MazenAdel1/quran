import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import ListOfSurahs from "./ListOfSurahs";
import ListOfJuzs from "./ListOfJuzs";
import ListOfBookMarks from "./ListOfBookMarks";

export default function Aside() {
  const asideRef = useRef();

  const [categories, setCategories] = useState([
    { title: "السور", active: true },
    { title: "الأجزاء", active: false },
    { title: "المرجعيات", active: false },
  ]);

  const handlingAsideStatus = () => {
    asideRef.current.classList.toggle(`right-0`);
  };

  const handlingCategoryClick = (e) => {
    setCategories((currCategory) => {
      return currCategory.map((category) => {
        if (category.title == e.target.textContent) {
          return { ...category, active: true };
        } else {
          return { ...category, active: false };
        }
      });
    });
  };

  return (
    <>
      <button
        onClick={handlingAsideStatus}
        className="fixed right-8 top-4 z-10 text-3xl text-white transition-all"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </button>
      <aside
        ref={asideRef}
        className="fixed -right-full top-14 z-10 flex h-[calc(100dvh-44px)] w-[250px] flex-col overflow-y-auto bg-[#101a2e] text-3xl text-white transition-all duration-300 sm:w-[400px]"
      >
        <nav className="relative z-10">
          <ul className="sticky right-0 top-0 z-50 flex w-full bg-orange">
            {categories.map((el) => {
              return (
                <li className="flex-1 text-xl sm:text-3xl" key={el.title}>
                  <button
                    className={`w-full py-1 text-center transition hover:bg-[#ffb066] ${
                      el.active && "bg-[#d8873b]"
                    }`}
                    onClick={handlingCategoryClick}
                  >
                    {el.title}
                  </button>
                </li>
              );
            })}
          </ul>
          {categories[0].active && <ListOfSurahs />}
          {categories[1].active && <ListOfJuzs />}
          {categories[2].active && <ListOfBookMarks />}
        </nav>
      </aside>
    </>
  );
}
