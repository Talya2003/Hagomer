import React from "react";
import Countdown from "../components/Countdown";
import JokesBox from "../components/JokesBox";
import NotesBox from "../components/NotesBox";

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
            <div style={{ flex: "1", minWidth: "300px" }}>
                <Countdown />
            </div>

            <div style={{ flex: "1", minWidth: "300px" }}>
                <JokesBox />
                <NotesBox />
            </div>
        </div>
    );
};

export default Home;