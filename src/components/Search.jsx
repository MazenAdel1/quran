// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Search() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState({
//     results: [],
//     totalResults: 0,
//   });
//   const [currentApiResultPage, setCurrentApiResultPage] = useState(1);
//   const [totalApiResultsPages, setTotalApiResultsPages] = useState(1);

//   const searchResultRef = useRef();

//   const handleChange = (e) => {
//     if (e.target.value === "") {
//       searchResultRef.current.classList.add(`hidden`);
//       document.body.classList.remove(`overflow-hidden`);
//     } else {
//       searchResultRef.current.classList.remove(`hidden`);
//       document.body.classList.add(`overflow-hidden`);
//     }
//     setSearch(e.target.value);
//     setCurrentApiResultPage(1);
//   };

//   useEffect(() => {
//     fetch(
//       `https://api.quran.com/api/v4/search?q=${search}&page=${currentApiResultPage}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setSearchResult({
//           results: data.search.results,
//           totalResults: data.search.total_results,
//         });
//         setTotalApiResultsPages(data.search.total_pages);
//       });
//   }, [search, currentApiResultPage]);

//   const handleClick = () => {
//     setCurrentApiResultPage(currentApiResultPage + 1);
//   };

//   return (
//     <>
//       <div className="w-1/2 mx-auto py-2">
//         <input
//           type="text"
//           placeholder="البحث عن آية..."
//           className="w-full border-none outline-none px-2 py-1 rounded-md bg-primary-white"
//           onChange={handleChange}
//         />
//       </div>

//       <div
//         className="w-full h-[calc(100dvh-60px)] bg-[#000000ce] absolute z-50 bottom-0 px-4 py-4 hidden overflow-auto"
//         ref={searchResultRef}
//       >
//         <span className="text-white block text-lg pb-6">
//           مجموع النتائج: {searchResult.totalResults}
//         </span>

//         <div className="flex flex-col gap-7 text-2xl">
//           {totalApiResultsPages > 1 &&
//             currentApiResultPage !== totalApiResultsPages && (
//               <button
//                 onClick={handleClick}
//                 className="text-black bg-white hover:bg-gray-200 transition"
//               >
//                 تحميل المزيد
//               </button>
//             )}
//         </div>
//       </div>
//     </>
//   );
// }
