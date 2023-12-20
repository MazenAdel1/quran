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

  return (
    <>
      <button onClick={bookmarkPage}>
        <FontAwesomeIcon
          icon={faBookmark}
          className=" fixed left-10 top-0 text-4xl text-white transition"
          ref={saveButtonRef}
        />
      </button>
      <div className="flex min-h-[calc(100dvh-24px)] flex-col justify-between gap-3 px-3 py-3 text-primary-white md:px-10">
        <div className="mt-3 self-end">
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
            <p className="text-center text-2xl leading-[65px] sm:text-start sm:text-3xl sm:leading-[70px] md:text-4xl md:leading-[90px]">
              {ayahs.map((ayah) => {
                if (
                  ayah.text.includes(
                    `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`,
                  ) ||
                  (ayah.text.includes(
                    `بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`,
                  ) &&
                    ayah.numberInSurah === 1)
                ) {
                  return (
                    <>
                      <i className="mt-2 block text-center font-bold">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                      </i>
                      {`${
                        ayah.text.split(
                          `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`,
                        )[1] ||
                        ayah.text.split(
                          `بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`,
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
              className="mt-10 w-full animate-spin text-center text-4xl"
            />
          )}
        </div>

        <span
          className={`mt-5 w-fit rounded-md bg-black px-2 py-1 text-xl text-secondary sm:text-2xl ${
            pageNumber % 2 == 0 && "self-end"
          }`}
        >
          صفحة {pageNumber}
        </span>
      </div>
      <Link
        to={`/quran/page/${+pageNumber + 1}`}
        onClick={() => {
          +pageNumber++;
          saveButtonRef.current.classList.remove(`text-accent`);
        }}
        className={`text-xl opacity-60 transition hover:opacity-100 focus-visible:opacity-100 sm:text-2xl ${
          +pageNumber === 604 && "hidden"
        } fixed left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black text-primary-white sm:h-12 sm:w-12`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <Link
        to={`/quran/page/${+pageNumber - 1}`}
        onClick={() => {
          +pageNumber--;
          saveButtonRef.current.classList.remove(`text-accent`);
        }}
        className={`text-xl opacity-60 transition hover:opacity-100 focus-visible:opacity-100 sm:text-2xl ${
          +pageNumber === 1 && "hidden"
        } fixed right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black text-primary-white sm:h-12 sm:w-12`}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </>
  );
}
