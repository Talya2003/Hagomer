import React from "react";
import Countdown from "../components/Countdown";
import JokesBox from "../components/JokesBox";
import NotesBox from "../components/NotesBox";
import CalendarGrid from "../components/CalendarGrid";

const Home = () => {
    return (
        <div style={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            justifyContent: "center",
            alignItems: "flex-start",
            direction: "rtl",
            flexWrap: "wrap",
        }}>
            <Countdown />
            <div style={{ flex: "3", minWidth: "300px" }}>
                <CalendarGrid />
            </div>

            <div style={{ flex: "1", minWidth: "300px" }}>
                <JokesBox />
                <NotesBox />
            </div>
        </div>
    );
};

export default Home;