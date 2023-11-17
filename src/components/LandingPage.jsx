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
      <div className="absolute bg-secondary w-[100px] h-[100px] rounded-full blur-[200px] -z-10"></div>
      <div className="absolute bg-secondary w-[100px] h-[100px] rounded-full blur-[200px] -z-10 left-0 top-1/2 -translate-y-1/2"></div>
      <div className="text-primary-white flex flex-col items-center gap-5 pt-8 mb-10 px-5">
        <h1 className="text-2xl underline font-bold">في فضل القرآن</h1>
        <p className="text-xl text-center">
          <i>
            أن النبي صلى الله عليه وسلم قال: (من قرأ حرفاً من كتاب الله فله به
            حسنة، والحسنة بعشر أمثالها، لا أقول: "الم" حرف، ولكن "ألف" حرف،
            و"لام" حرف، و"ميم" حرف).
          </i>
        </p>
      </div>

      <div className="container mx-auto sm:px-32 ">
        <nav className="z-10 container mx-auto w-full relative">
          <div className="sm:absolute sm:left-full h-full sticky">
            <ul className="flex w-full sticky top-0 bg-orange right-0 z-50 sm:flex-col sm:w-fit sm:right-0 sm:top-0">
              {categories.map((el) => {
                return (
                  <li className="flex-1 sm:text-3xl text-xl" key={el.title}>
                    <button
                      className={`w-full text-center hover:bg-[#ffb066] transition py-3 sm:px-2 ${
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
