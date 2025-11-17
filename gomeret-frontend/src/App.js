import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Countdown from "./components/Countdown";
import Header from "./components/Header";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Jokes from "./components/JokesBox";

function App() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", direction: "rtl", textAlign: "center",}}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/jokes" element={<Jokes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;