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
        className="text-white transition-all text-3xl right-8 top-4 fixed  z-10"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </button>
      <aside
        ref={asideRef}
        className="text-white text-3xl fixed  transition-all duration-300 bg-[#101a2e] sm:w-[400px] w-[250px] flex flex-col top-14 -right-full h-[calc(100dvh-44px)] z-10 overflow-y-scroll "
      >
        <nav className="z-10  relative">
          <ul className="flex w-full sticky top-0 bg-orange right-0 z-50">
            {categories.map((el) => {
              return (
                <li className="flex-1 sm:text-3xl text-xl" key={el.title}>
                  <button
                    className={`w-full text-center hover:bg-[#ffb066] transition py-1 ${
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
