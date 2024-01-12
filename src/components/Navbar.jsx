import { useState } from "react";
import ListOfBookMarks from "./ListOfBookMarks";
import ListOfJuzs from "./ListOfJuzs";
import ListOfSurahs from "./ListOfSurahs";

export default function Navbar({ aside, landingPage }) {
  const [categories, setCategories] = useState([
    { title: "السور", active: true },
    { title: "الأجزاء", active: false },
    { title: "المرجعيات", active: false },
  ]);

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
      <nav
        className={`${
          landingPage && "container relative z-10 mx-auto w-full"
        } ${aside && "relative z-10"}`}
      >
        <div
          className={`${
            landingPage
              ? "absolute top-[-44px] h-full w-full sm:left-full sm:top-0 sm:w-auto"
              : "sticky top-0 z-50"
          }`}
        >
          <ul
            className={` flex w-full bg-orange ${
              landingPage &&
              "sticky right-0 top-0 z-50 sm:right-0 sm:top-0 sm:w-fit sm:flex-col"
            }`}
          >
            {categories.map((el) => {
              return (
                <li className="flex-1 text-xl sm:text-3xl" key={el.title}>
                  <button
                    className={`w-full px-1 py-2 text-center transition hover:bg-[#ffb066] ${
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
        </div>

        {categories[0].active && <ListOfSurahs />}
        {categories[1].active && <ListOfJuzs />}
        {categories[2].active && <ListOfBookMarks />}
      </nav>
    </>
  );
}
