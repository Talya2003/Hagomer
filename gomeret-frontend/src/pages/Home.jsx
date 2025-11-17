import React from "react";
import Countdown from "../components/Countdown";
import JokesBox from "../components/JokesBox";
import NotesBox from "../components/NotesBox";
import CalendarGrid from "../components/CalendarGrid";

const Home = () => {
    return (
        <div
            style={{
                padding: "20px",
                direction: "rtl",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px",
                }}
            >
                <Countdown />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: "30px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        width: "25%",
                        minWidth: "250px",
                    }}
                >
                    <JokesBox />
                    <NotesBox />
                </div>

                <div
                    style={{
                        width: "70%",
                        minWidth: "400px",
                    }}
                >
                    <CalendarGrid />
                </div>
            </div>
        </div>
    );
};

export default Home;