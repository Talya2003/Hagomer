import React, { useState, useEffect } from "react";

const CalendarGrid = () => {
    const realToday = new Date();

    const [year, setYear] = useState(realToday.getFullYear());
    const [month, setMonth] = useState(realToday.getMonth());

    const [events, setEvents] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [eventText, setEventText] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("calendarEvents");
        if (saved) setEvents(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }, [events]);

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

    const openModal = (day) => {
        if (!day) return;
        const dateStr = `${year}-${month + 1}-${day}`;
        setSelectedDate(dateStr);
        setEventText("");
        setIsModalOpen(true);
    };

    const saveEvent = () => {
        if (eventText.trim() === "") return;

        setEvents((prev) => {
            const old = prev[selectedDate] || [];
            return {
                ...prev,
                [selectedDate]: [...old, { text: eventText, id: Date.now() }],
            };
        });

        setEventText("");
        setIsModalOpen(false);
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
                    const dateStr = day ? `${year}-${month + 1}-${day}` : null;

                    const isToday =
                        day &&
                        year === realToday.getFullYear() &&
                        month === realToday.getMonth() &&
                        day === realToday.getDate();

                    const hasEvents = dateStr && events[dateStr];

                    return (
                        <div
                            key={i}
                            onClick={() => openModal(day)}
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
                                cursor: day ? "pointer" : "default",
                                position: "relative",
                            }}
                        >
                            {day}

                            {hasEvents && (
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: "#D4AF37",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        bottom: "4px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                >
                    <div
                        style={{
                            background: "#222",
                            padding: "20px",
                            borderRadius: "10px",
                            border: "1px solid #D4AF37",
                            width: "300px",
                            textAlign: "center",
                        }}
                    >
                        <h3 style={{ color: "#D4AF37" }}>הוסף אירוע</h3>
                        <p style={{ color: "#fff" }}>{selectedDate}</p>

                        <input
                            type="text"
                            value={eventText}
                            onChange={(e) => setEventText(e.target.value)}
                            placeholder="תיאור האירוע..."
                            style={{
                                width: "90%",
                                padding: "8px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "1px solid #D4AF37",
                                background: "#000",
                                color: "#fff",
                            }}
                        />

                        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                            <button
                                onClick={saveEvent}
                                style={{
                                    backgroundColor: "#D4AF37",
                                    color: "#000",
                                    padding: "8px 12px",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                            >
                                שמירה
                            </button>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    backgroundColor: "#555",
                                    color: "#fff",
                                    padding: "8px 12px",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                ביטול
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarGrid;