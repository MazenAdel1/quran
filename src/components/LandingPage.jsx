import { useState } from "react";
import ListOfSurahs from "./ListOfSurahs";
import ListOfJuzs from "./ListOfJuzs";
import ListOfBookMarks from "./ListOfBookMarks";

export default function LandingPage() {
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
      <div className="absolute -z-10 h-[100px] w-[100px] rounded-full bg-secondary blur-[200px]"></div>
      <div className="absolute left-0 top-1/2 -z-10 h-[100px] w-[100px] -translate-y-1/2 rounded-full bg-secondary blur-[200px]"></div>
      <div className="mb-10 flex flex-col items-center gap-5 px-5 pt-8 text-primary-white">
        <h1 className="text-2xl font-bold underline">في فضل القرآن</h1>
        <p className="text-center text-xl">
          <i>
            أن النبي صلى الله عليه وسلم قال: {"("}من قرأ حرفاً من كتاب الله فله
            به حسنة، والحسنة بعشر أمثالها، لا أقول: &quot;الم&quot; حرف، ولكن
            &quot;ألف&quot; حرف، و &quot;لام&quot; حرف، و &quot;ميم&quot; حرف
            {")"}.
          </i>
        </p>
      </div>

      <div className="container mx-auto sm:px-32 ">
        <nav className="container relative z-10 mx-auto w-full">
          <div className="sticky h-full sm:absolute sm:left-full">
            <ul className="sticky right-0 top-0 z-50 flex w-full bg-orange sm:right-0 sm:top-0 sm:w-fit sm:flex-col">
              {categories.map((el) => {
                return (
                  <li className="flex-1 text-xl sm:text-3xl" key={el.title}>
                    <button
                      className={`w-full py-3 text-center transition hover:bg-[#ffb066] sm:px-2 ${
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
          <div>{categories[0].active && <ListOfSurahs />}</div>
          <div>{categories[1].active && <ListOfJuzs />}</div>
          <div>{categories[2].active && <ListOfBookMarks />}</div>
        </nav>
      </div>
    </>
  );
}
