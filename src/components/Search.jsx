// //
// //
// // future Idea
// //
// //

// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Search() {
//   // https://api.quran.com/api/v4/search?q=${search}&size=50&page=${currentApiResultPage}

//   const [results, setResults] = useState([]);
//   const [resultApiPages, setResultApiPages] = useState(0);
//   const [currentApiResultPage, setCurrentApiResultPage] = useState(1);
//   const searchResultsRef = useRef();
//   const inputRef = useRef();

//   const fetchData = async (input) => {
//     const response = await fetch(
//       `https://api.quran.com/api/v4/search?q=${input.trim()}&size=50&page=${currentApiResultPage}`,
//     );
//     const data = await response.json();

//     setResultApiPages(data.search.total_pages);

//     if (data.search.total_results) {
//       const fullData = data.search.results.map(async (e) => {
//         const res = await fetch(
//           `https://api.quran.com/api/v4/verses/by_key/${e.verse_key}`,
//         );
//         const pageNumber = await res.json();

//         return { ayah: e.text, pageNumber: pageNumber.verse.page_number };
//       });
//       Promise.all(fullData).then((D) => {
//         const sortedData = D.sort((a, b) => a.pageNumber - b.pageNumber);
//         setResults(sortedData);
//       });
//     }
//   };

//   const handleChange = async (input) => {
//     document.body.classList.add(`overflow-y-hidden`);
//     searchResultsRef.current.classList.remove(`hidden`);
//     if (input.trim() === ``) {
//       handleClose();
//     }

//     setCurrentApiResultPage(1);

//     fetchData(input);
//   };

//   const handleClose = () => {
//     searchResultsRef.current.classList.add(`hidden`);
//     document.body.classList.remove(`overflow-y-hidden`);
//   };

//   useEffect(() => {
//     if (inputRef.current.value) {
//       fetchData(inputRef.current.value);
//     }
//   }, [currentApiResultPage]);

//   return (
//     <>
//       <input
//         type="text"
//         placeholder="البحث عن آية..."
//         ref={inputRef}
//         className="mx-auto my-2 block w-[calc(100%-160px)] rounded-md px-2 py-1 outline-none sm:w-1/2"
//         onChange={(e) => handleChange(e.target.value)}
//       />

//       <div
//         ref={searchResultsRef}
//         className="absolute z-50 hidden h-[calc(100%-52px)] w-full overflow-y-auto bg-[#000000] py-2"
//       >
//         <button
//           onClick={handleClose}
//           className="mb-2 mr-2 rounded-md bg-white px-2 py-1 transition hover:bg-gray-200"
//         >
//           إغلاق
//         </button>
//         <ul className="flex flex-col gap-3">
//           {results &&
//             results.map((el, index) => {
//               return (
//                 <li key={index}>
//                   <Link
//                     to={`quran/page/${el.pageNumber}`}
//                     onClick={handleClose}
//                     className="flex flex-wrap gap-2 bg-gray-700 px-1 py-2 text-lg leading-[40px] text-white transition hover:bg-gray-800"
//                   >
//                     <p>{el.ayah}</p>
//                     <span className="bg-black px-1">صفحة {el.pageNumber}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//         </ul>
//         <div className={`flex gap-2 ${resultApiPages <= 1 && "hidden"}`}>
//           <button
//             onClick={() => {
//               if (currentApiResultPage > 1) {
//                 setCurrentApiResultPage((prev) => prev - 1);
//               }
//             }}
//             className={`mt-2 w-full rounded-md bg-white py-1 hover:bg-gray-200 ${
//               currentApiResultPage === 1 && "hidden"
//             }`}
//           >
//             السابق
//           </button>
//           <button
//             onClick={() => {
//               if (currentApiResultPage < resultApiPages) {
//                 setCurrentApiResultPage((prev) => prev + 1);
//               }
//             }}
//             className={`mt-2 w-full rounded-md bg-white py-1 hover:bg-gray-200 ${
//               currentApiResultPage === resultApiPages && "hidden"
//             }`}
//           >
//             التالي
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
