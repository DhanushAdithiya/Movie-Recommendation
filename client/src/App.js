import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieInfo from "./pages/MovieInfo/MovieInfo";
import Landing from "./pages/Landing/Landing";
import "../src/css/reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/search" Component={SearchPage} />
        <Route path="/movie/:id" Component={MovieInfo} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
