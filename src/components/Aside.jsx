import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Navbar from "./Navbar";

export default function Aside() {
  const asideRef = useRef();

  const handlingAsideStatus = () => {
    asideRef.current.classList.toggle(`right-0`);
  };

  return (
    <>
      <button
        onClick={handlingAsideStatus}
        className="fixed right-8 top-4 z-10 text-3xl text-white transition-all"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </button>
      <aside
        ref={asideRef}
        className="fixed -right-full top-14 z-10 flex h-[calc(100dvh-44px)] w-[250px] flex-col overflow-y-auto bg-[#101a2e] text-3xl transition-all duration-300 sm:w-[400px]"
      >
        <Navbar aside />
      </aside>
    </>
  );
}
