import { Route, Routes } from "react-router-dom";
import ListOfSurahs from "./components/ListOfSurahs";
import Surah from "./components/Surah";
import Page from "./components/Page";
import Aside from "./components/Aside";
import LandingPage from "./components/LandingPage";
// import Search from "./components/Search";

function App() {
  document.dir = `rtl`;
  document.children[0].className = `font-arabic bg-primary`;

  return (
    <>
      {/* <Search /> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/:surah"
          element={
            <>
              <Aside />
              <Surah />
            </>
          }
        />
        <Route
          path="/page/:pageNumber"
          element={
            <>
              <Aside />
              <Page />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
