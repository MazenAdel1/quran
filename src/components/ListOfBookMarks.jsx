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
        <ul className="flex flex-col justify-center items-center">
          <button
            className="bg-accent text-white w-full text-2xl py-1 my-1 hover:bg-[#f88062] transition"
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
              className={`w-full flex flex-row-reverse bg-[#121C34] transition hover:bg-[#172236] py-2 text-center text-primary-white text-3xl ${
                pageIndex != bookmark.length - 1 && "border-b"
              }`}
            >
              <Link to={`/page/${page}`} className="block w-full">
                صفحة {page}
              </Link>
              <button
                className="bg-accent text-white flex justify-center items-center px-1 mr-2"
                onClick={() => dispatch(deleteBookmark(page))}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full text-white flex justify-center items-center text-3xl min-h-[180px]">
          ليس لديك مرجعيات
        </div>
      )}
    </>
  );
}
