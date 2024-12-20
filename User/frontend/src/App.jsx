import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Footer from "./components/Footer";
// import latisha from "./components/latisha";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        {/* <Route path="/latisha" element={<latisha />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
