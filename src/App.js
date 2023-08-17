import React from "react";

import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import CustomScroll from "./components/CustomScroll";
import LibraryScroll from "./components/LibraryScroll";
import IntersectionScroll from "./components/IntersectionScroll";

function App() {
  return (
    <>
      <div className="flex flex-row shadow-md mv-10 p-5 sticky top-0 bg-white">
        <Link to={`custom`} className="basis-1/3">
          Custom Scroll
        </Link>
        <Link to={`library`} className="basis-1/3">
          Use library
        </Link>
        <Link to={`intersection`} className="basis-1/3">
          Intersection Observer API
        </Link>
      </div>
      <div className="mt-10 mx-10">
        <Routes>
          <Route path="/custom" Component={CustomScroll} />
          <Route path="/library" Component={LibraryScroll} />
          <Route path="/intersection" Component={IntersectionScroll} />
        </Routes>
      </div>
    </>
  );
}

export default App;
