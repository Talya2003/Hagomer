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
            {/* ספירה לאחור למעלה */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px",
                }}
            >
                <Countdown />
            </div>

            {/* אזור תוכן - שתי עמודות */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* טור שמאל - בדיחות + השראה */}
                <div style={{ flex: "1", minWidth: "280px" }}>
                    <JokesBox />
                    <NotesBox />
                </div>

                {/* טור ימין - לוח שנה */}
                <div
                    style={{
                        flex: "2",
                        minWidth: "350px",
                        marginTop: "20px", // ⭐️ מיישר לגובה
                    }}
                >
                    <CalendarGrid />
                </div>
            </div>
        </div>
    );
};

export default Home;