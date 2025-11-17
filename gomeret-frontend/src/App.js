import React from "react";
import Countdown from "./components/Countdown";
import Header from "./components/Header";

function App() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", direction: "rtl", textAlign: "center",}}>
      <Header />
      <Countdown />
    </div>
  );
}

export default App;