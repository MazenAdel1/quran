import {
  faArrowLeft,
  faArrowRight,
  faBookmark,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  deleteBookmark,
  saveBookmark,
  saveToLocalStorage,
} from "../RTK/slices/bookmarkSlice";

export default function Page() {
  let { pageNumber } = useParams();

  const [ayahs, setAyahs] = useState();
  const [surahs, setSurahs] = useState();
  const saveButtonRef = useRef();

  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`//api.alquran.cloud/v1/page/${+pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setAyahs(data.data.ayahs);
        setSurahs(data.data.surahs);
      });

    let currentPageMarked = false;

    if (bookmark.length) {
      let pages = bookmark.filter((page) => page == pageNumber);
      pages.length ? (currentPageMarked = true) : (currentPageMarked = false);
    }

    if (currentPageMarked) {
      saveButtonRef.current.classList.add(`text-accent`);
      saveButtonRef.current.classList.remove(`text-white`);
    } else {
      saveButtonRef.current.classList.add(`text-white`);
      saveButtonRef.current.classList.remove(`text-accent`);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (!bookmark.includes(pageNumber)) {
      saveButtonRef.current.classList.add(`text-white`);
      saveButtonRef.current.classList.remove(`text-accent`);
    } else {
      saveButtonRef.current.classList.add(`text-accent`);
      saveButtonRef.current.classList.remove(`text-white`);
    }
  }, [bookmark]);

  const bookmarkPage = () => {
    if (!bookmark.includes(pageNumber)) {
      dispatch(saveBookmark(pageNumber));
    } else {
      dispatch(deleteBookmark(pageNumber));
    }
    dispatch(saveToLocalStorage(bookmark));

    saveButtonRef.current.classList.toggle(`text-accent`);
    saveButtonRef.current.classList.toggle(`text-white`);
  };

  surahs && console.log(Object.entries(surahs));
  return (
    <>
      <button onClick={bookmarkPage}>
        <FontAwesomeIcon
          icon={faBookmark}
          className=" text-white left-10 top-0 text-4xl fixed transition"
          ref={saveButtonRef}
        />
      </button>
      <div className="text-primary-white py-3 md:px-10 px-3 flex flex-col gap-3 min-h-[calc(100dvh-24px)] justify-between">
        <div className="self-end mt-3">
          {surahs &&
            Object.entries(surahs).map((surah, index) => (
              <span key={surah[1].englishName}>
                {surah[1].name}{" "}
                {index !== Object.entries(surahs).length - 1 && "| "}
              </span>
            ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-8">
          {ayahs ? (
            <p className="md:leading-[90px] md:text-4xl sm:text-3xl sm:leading-[70px] text-2xl leading-[65px] sm:text-start text-center">
              {ayahs.map((ayah) => {
                if (
                  ayah.text.includes(
                    `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                  ) ||
                  (ayah.text.includes(
                    `بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                  ) &&
                    ayah.numberInSurah === 1)
                ) {
                  return (
                    <>
                      <i className="block text-center font-bold mt-2">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                      </i>
                      {`${
                        ayah.text.split(
                          `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                        )[1] ||
                        ayah.text.split(
                          `بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                        )[1]
                      } ${`\u06DD${ayah.numberInSurah}`} `}
                    </>
                  );
                }
                return `${ayah.text} ${`\u06DD${ayah.numberInSurah}`} `;
              })}
            </p>
          ) : (
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="animate-spin text-4xl w-full text-center mt-10"
            />
          )}
        </div>

        <span
          className={`text-secondary rounded-md bg-black sm:text-2xl text-xl w-fit mt-5 py-1 px-2 ${
            pageNumber % 2 == 0 && "self-end"
          }`}
        >
          صفحة {pageNumber}
        </span>
      </div>
      <Link
        to={`/page/${+pageNumber + 1}`}
        onClick={() => {
          +pageNumber++;
          saveButtonRef.current.classList.remove(`text-accent`);
        }}
        className={`sm:text-2xl text-xl ${
          +pageNumber === 604 && "hidden"
        } fixed top-1/2 left-1 -translate-y-1/2 bg-black text-primary-white sm:w-12 w-9 sm:h-12 h-9 flex justify-center items-center rounded-full`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <Link
        to={`/page/${+pageNumber - 1}`}
        onClick={() => {
          +pageNumber--;
          saveButtonRef.current.classList.remove(`text-accent`);
        }}
        className={`sm:text-2xl text-xl ${
          +pageNumber === 1 && "hidden"
        } fixed top-1/2 right-1 -translate-y-1/2 bg-black text-primary-white sm:w-12 w-9 sm:h-12 h-9 flex justify-center items-center rounded-full`}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </>
  );
}
