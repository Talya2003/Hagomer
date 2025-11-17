import React, { useState } from "react";

const CalendarGrid = () => {
    const realToday = new Date();

    const [year, setYear] = useState(realToday.getFullYear());
    const [month, setMonth] = useState(realToday.getMonth());

    const monthsNames = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
    ];

    const daysNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const goToToday = () => {
        setYear(realToday.getFullYear());
        setMonth(realToday.getMonth());
    };

    return (
        <div
            style={{
                backgroundColor: "#111",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #D4AF37",
                color: "#fff",
                direction: "rtl",
                marginTop: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={prevMonth}
                    style={{
                        background: "none",
                        border: "1px solid #D4AF37",
                        color: "#D4AF37",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    ➡️
                </button>

                <h2 style={{ color: "#D4AF37", margin: 0 }}>
                    {monthsNames[month]} {year}
                </h2>

                <button
                    onClick={nextMonth}
                    style={{
                        background: "none",
                        border: "1px solid #D4AF37",
                        color: "#D4AF37",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    ⬅️
                </button>

                <button
                    onClick={goToToday}
                    style={{
                        backgroundColor: "#D4AF37",
                        color: "#000",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    היום
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "#D4AF37",
                    fontWeight: "bold",
                }}
            >
                {daysNames.map((d, i) => (
                    <div key={i}>{d}</div>
                ))}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                    textAlign: "center",
                }}
            >
                {daysArray.map((day, i) => {
                    const isToday =
                        day &&
                        year === realToday.getFullYear() &&
                        month === realToday.getMonth() &&
                        day === realToday.getDate();

                    return (
                        <div
                            key={i}
                            style={{
                                padding: "10px 0",
                                borderRadius: "5px",
                                backgroundColor: day
                                    ? isToday
                                        ? "#D4AF37"
                                        : "#000"
                                    : "transparent",
                                border: day ? "1px solid #D4AF37" : "none",
                                color: isToday ? "#000" : "#fff",
                                fontWeight: isToday ? "bold" : "normal",
                            }}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;