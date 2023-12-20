import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cleanBookmark,
  deleteBookmark,
  saveToLocalStorage,
} from "../RTK/slices/bookmarkSlice";

export default function ListOfBookMarks() {
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();
  return (
    <>
      {bookmark.length ? (
        <ul className="flex flex-col items-center justify-center">
          <button
            className="my-1 w-full bg-accent py-1 text-2xl text-white transition hover:bg-[#f88062]"
            onClick={() => {
              dispatch(cleanBookmark());
              dispatch(saveToLocalStorage(bookmark));
            }}
          >
            مسح الكل
          </button>
          {bookmark.map((page, pageIndex) => (
            <li
              key={page}
              className={`flex w-full flex-row-reverse bg-[#121C34] py-2 text-center text-3xl text-primary-white transition hover:bg-[#172236] ${
                pageIndex != bookmark.length - 1 && "border-b"
              }`}
            >
              <Link to={`/quran/page/${page}`} className="block w-full">
                صفحة {page}
              </Link>
              <button
                className="mr-2 flex items-center justify-center bg-accent px-1 text-white"
                onClick={() => {
                  dispatch(deleteBookmark(page));
                  dispatch(saveToLocalStorage(bookmark));
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[180px] w-full items-center justify-center text-3xl text-white">
          ليس لديك مرجعيات
        </div>
      )}
    </>
  );
}
