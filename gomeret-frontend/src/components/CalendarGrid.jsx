import React, { useState, useEffect } from "react";

const CalendarGrid = () => {
    const realToday = new Date();

    const [year, setYear] = useState(realToday.getFullYear());
    const [month, setMonth] = useState(realToday.getMonth());


    const [events, setEvents] = useState({});
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [hoveredEventData, setHoveredEventData] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDateKey, setSelectedDateKey] = useState(null);
    const [selectedDateLabel, setSelectedDateLabel] = useState("");
    const [editingEventId, setEditingEventId] = useState(null);
    const [draggingEvent, setDraggingEvent] = useState(null);
    const [category, setCategory] = useState("");

    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [notes, setNotes] = useState("");
    const [attendees, setAttendees] = useState("");

    const monthsNames = [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
    ];

    const daysNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

    const categoryColors = {
        study: { bg: "#1E2A44", text: "#E6ECF7" },
        personal: { bg: "#4A1F2F", text: "#F8DDE2" },
        work: { bg: "#54430D", text: "#FFF7D1" },
    };

    const formatDateKey = (y, m, d) =>
        `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    useEffect(() => {
        const saved = localStorage.getItem("calendarEvents");
        if (saved) {
            try {
                setEvents(JSON.parse(saved));
            } catch {
                setEvents({});
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }, [events]);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    };

    const goToToday = () => {
        setYear(realToday.getFullYear());
        setMonth(realToday.getMonth());
    };

    const openModal = (day) => {
        if (!day) return;
        const key = formatDateKey(year, month, day);
        const label = `${day}.${month + 1}.${year}`;
        setSelectedDateKey(key);
        setSelectedDateLabel(label);
        setTitle("");
        setStartTime("");
        setEndTime("");
        setNotes("");
        setAttendees("");
        setIsModalOpen(true);
        setCategory("");
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const startEditEvent = (event) => {
        setEditingEventId(event.id);
        setTitle(event.title);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
        setNotes(event.notes);
        setAttendees(event.attendees);
    };

    const saveEvent = () => {
        if (!selectedDateKey) return;
        if (!title.trim() && !notes.trim()) return;

        if (editingEventId) {
            setEvents(prev => {
                const updated = prev[selectedDateKey].map(ev =>
                    ev.id === editingEventId
                        ? {
                            ...ev,
                            title,
                            startTime,
                            endTime,
                            notes,
                            attendees,
                            category,
                        }
                        : ev
                );
                return { ...prev, [selectedDateKey]: updated };
            });

            setEditingEventId(null);
        } else {
            const newEvent = {
                id: Date.now(),
                title: title.trim() || "אירוע ללא שם",
                startTime: startTime || null,
                endTime: endTime || null,
                notes: notes.trim() || "",
                attendees: attendees.trim() || "",
                category: category || "",
            };

            setEvents(prev => ({
                ...prev,
                [selectedDateKey]: [...(prev[selectedDateKey] || []), newEvent],
            }));
        }

        setTitle("");
        setStartTime("");
        setEndTime("");
        setNotes("");
        setAttendees("");
    };

    const deleteEvent = (eventId) => {
        if (!selectedDateKey) return;
        setEvents((prev) => {
            const old = prev[selectedDateKey] || [];
            const filtered = old.filter((e) => e.id !== eventId);
            const updated = { ...prev };
            if (filtered.length === 0) {
                delete updated[selectedDateKey];
            } else {
                updated[selectedDateKey] = filtered;
            }
            return updated;
        });
    };

    const handleDropEvent = (targetDateKey) => {
        if (!draggingEvent) return;
        if (draggingEvent.from === targetDateKey) return;

        setEvents(prev => {
            const updated = { ...prev };

            updated[draggingEvent.from] =
                updated[draggingEvent.from].filter(ev => ev.id !== draggingEvent.id);

            if (updated[draggingEvent.from].length === 0) {
                delete updated[draggingEvent.from];
            }

            if (!updated[targetDateKey]) updated[targetDateKey] = [];
            updated[targetDateKey].push({
                ...draggingEvent,
                from: undefined,
            });

            return updated;
        });

        setDraggingEvent(null);
    };
    
    const monthEvents = Object.entries(events)
        .filter(([dateKey]) => {
            const [y, m] = dateKey.split("-").map(Number);
            return y === year && m === month + 1;
        })
        .flatMap(([dateKey, evs]) =>
            evs.map(ev => ({
                ...ev,
                dateKey,
                dateLabel: dateKey.split("-").reverse().join("."),
            }))
        )
        .sort((a, b) => {
            const timeA = a.startTime || "00:00";
            const timeB = b.startTime || "00:00";
            return a.dateKey.localeCompare(b.dateKey) || timeA.localeCompare(timeB);
        });

    const modalAnimationStyle = {
        opacity: 0,
        transform: "scale(0.95)",
        animation: "fadeInModal 0.25s ease-out forwards",
    };

    const modalKeyframes = `
        @keyframes fadeInModal {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        `;

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
            <style>{modalKeyframes}</style>

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
                    const dateKey = day ? formatDateKey(year, month, day) : null;
                    const dayEvents = dateKey && events[dateKey] ? events[dateKey] : [];

                    const isToday =
                        day &&
                        year === realToday.getFullYear() &&
                        month === realToday.getMonth() &&
                        day === realToday.getDate();

                    return (
                        <div
                            key={i}
                            onClick={() => openModal(day)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDropEvent(dateKey)}
                            style={{
                                position: "relative",
                                padding: "6px 4px",
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
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                                minHeight: "70px",
                            }}
                        >
                            <div style={{ marginBottom: "4px", fontSize: "0.9rem" }}>{day}</div>

                            {day && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "4px",
                                        right: "6px",
                                        color: isToday ? "#000" : "#D4AF37",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(day);
                                    }}
                                >
                                    +
                                </div>
                            )}

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "3px",
                                    overflow: "hidden",
                                }}
                            >
                                {dayEvents.slice(0, 3).map((ev) => (
                                    <div
                                        key={ev.id}
                                        draggable
                                        onDragStart={() => setDraggingEvent({ ...ev, from: dateKey })}
                                        onDragEnd={() => setDraggingEvent(null)}
                                        style={{
                                            backgroundColor: ev.category
                                                ? categoryColors[ev.category]?.bg
                                                : isToday
                                                    ? "#000"
                                                    : "#D4AF37",

                                            color: ev.category
                                                ? categoryColors[ev.category]?.text
                                                : isToday
                                                    ? "#D4AF37"
                                                    : "#000",

                                            borderRadius: "6px",
                                            padding: "2px 4px",
                                            fontSize: "0.7rem",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                        onMouseEnter={() => {
                                            setHoveredEvent(ev.id);
                                            setHoveredEventData({
                                                ...ev,
                                                dateKey: dateKey,
                                                dateLabel: `${day}.${month + 1}.${year}`
                                            });
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredEvent(null);
                                            setHoveredEventData(null);
                                        }}
                                    >
                                        {ev.startTime && (
                                            <span style={{ opacity: 0.8 }}>{ev.startTime} </span>
                                        )}
                                        <span>{ev.title}</span>

                                        {hoveredEvent === ev.id && hoveredEventData && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-10px",
                                                    right: "100%",
                                                    background: hoveredEventData.category
                                                        ? categoryColors[hoveredEventData.category].bg
                                                        : "#fff",
                                                    color: hoveredEventData.category
                                                        ? categoryColors[hoveredEventData.category].text
                                                        : "#000",
                                                    border: "2px solid #D4AF37",
                                                    borderRadius: "10px",
                                                    padding: "10px",
                                                    fontSize: "0.78rem",
                                                    whiteSpace: "normal",
                                                    width: "220px",
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                                                    zIndex: 9999,
                                                }}
                                            >
                                                <strong style={{ color: "#D4AF37", fontSize: "0.9rem", display: "block", marginBottom: "6px" }}>
                                                    {hoveredEventData.title}
                                                </strong>

                                                <div style={{ marginBottom: "6px", fontSize: "0.75rem", opacity: 0.8 }}>
                                                    📅 {hoveredEventData.dateLabel}
                                                </div>

                                                <div style={{ marginBottom: "6px" }}>
                                                    🕒 <strong>{hoveredEventData.startTime || "—"}</strong>
                                                    {" עד "}
                                                    <strong>{hoveredEventData.endTime || "—"}</strong>
                                                </div>

                                                <div style={{ marginBottom: "6px" }}>
                                                    👥{" "}
                                                    {hoveredEventData.attendees && hoveredEventData.attendees.trim() !== ""
                                                        ? hoveredEventData.attendees
                                                        : "—"}
                                                </div>

                                                <div>
                                                    📝{" "}
                                                    {hoveredEventData.notes && hoveredEventData.notes.trim() !== ""
                                                        ? hoveredEventData.notes
                                                        : "אין הערות"}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {dayEvents.length > 3 && (
                                    <div
                                        style={{
                                            fontSize: "0.65rem",
                                            color: isToday ? "#000" : "#D4AF37",
                                            textAlign: "right",
                                            marginTop: "2px",
                                        }}
                                    >
                                        + {dayEvents.length - 3} נוספים
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && selectedDateKey && (
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
                            width: "360px",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            textAlign: "right",
                            direction: "rtl",
                            ...modalAnimationStyle, 
                        }}                        
                    >
                        <h3 style={{ color: "#D4AF37", marginTop: 0 }}>
                            אירועים עבור {selectedDateLabel}
                        </h3>

                        {events[selectedDateKey] && events[selectedDateKey].length > 0 && (
                            <div style={{ marginBottom: "15px" }}>
                                {events[selectedDateKey].map((ev) => (
                                    <div
                                        key={ev.id}
                                        style={{
                                            backgroundColor: "#111",
                                            borderRadius: "8px",
                                            padding: "8px",
                                            marginBottom: "8px",
                                            border: "1px solid #444",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            <strong style={{ color: "#D4AF37", fontSize: "0.9rem" }}>
                                                {ev.title}
                                            </strong>
                                            <button
                                                onClick={() => deleteEvent(ev.id)}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#ff6b6b",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                מחיקה
                                            </button>

                                            <button
                                                onClick={() => startEditEvent(ev)}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#D4AF37",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                    marginLeft: "10px"
                                                }}
                                            >
                                                עריכה
                                            </button>
                                        </div>

                                        {(ev.startTime || ev.endTime) && (
                                            <div style={{ fontSize: "0.8rem", marginBottom: "2px" }}>
                                                🕒 {ev.startTime || "—"} - {ev.endTime || "—"}
                                            </div>
                                        )}

                                        {ev.attendees && (
                                            <div style={{ fontSize: "0.8rem", marginBottom: "2px" }}>
                                                👥 {ev.attendees}
                                            </div>
                                        )}

                                        {ev.notes && (
                                            <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                                                📝 {ev.notes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* טופס הוספת אירוע חדש */}
                        <div
                            style={{
                                borderTop: "1px solid #444",
                                paddingTop: "10px",
                                marginTop: "5px",
                            }}
                        >
                            <h4 style={{ color: "#D4AF37", marginBottom: "8px" }}>
                                הוספת אירוע חדש
                            </h4>

                            <div style={{ marginBottom: "8px" }}>
                                <label
                                    style={{ display: "block", fontSize: "0.8rem", marginBottom: "3px" }}
                                >
                                    שם אירוע
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="כותרת..."
                                    style={{
                                        width: "100%",
                                        padding: "6px",
                                        borderRadius: "5px",
                                        border: "1px solid #D4AF37",
                                        background: "#000",
                                        color: "#fff",
                                        fontSize: "0.85rem",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    marginBottom: "8px",
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.8rem",
                                            marginBottom: "3px",
                                        }}
                                    >
                                        שעה התחלה
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "6px",
                                            borderRadius: "5px",
                                            border: "1px solid #D4AF37",
                                            background: "#000",
                                            color: "#fff",
                                            fontSize: "0.85rem",
                                        }}
                                    />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.8rem",
                                            marginBottom: "3px",
                                        }}
                                    >
                                        שעה סיום
                                    </label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "6px",
                                            borderRadius: "5px",
                                            border: "1px solid #D4AF37",
                                            background: "#000",
                                            color: "#fff",
                                            fontSize: "0.85rem",
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                                <label
                                    style={{ display: "block", fontSize: "0.8rem", marginBottom: "3px" }}
                                >
                                    מוזמנים
                                </label>
                                <input
                                    type="text"
                                    value={attendees}
                                    onChange={(e) => setAttendees(e.target.value)}
                                    placeholder="שמות/מיילים, מופרדים בפסיקים..."
                                    style={{
                                        width: "100%",
                                        padding: "6px",
                                        borderRadius: "5px",
                                        border: "1px solid #D4AF37",
                                        background: "#000",
                                        color: "#fff",
                                        fontSize: "0.85rem",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{ display: "block", fontSize: "0.8rem", marginBottom: "3px" }}
                                >
                                    קטגוריה
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "6px",
                                        borderRadius: "5px",
                                        border: "1px solid #D4AF37",
                                        background: "#000",
                                        color: "#fff",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    <option value="">ללא</option>
                                    <option value="study">📘 לימודים</option>
                                    <option value="personal">❤️ אישי</option>
                                    <option value="work">💼 עבודה</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{ display: "block", fontSize: "0.8rem", marginBottom: "3px" }}
                                >
                                    הערות
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    placeholder="הערות נוספות..."
                                    style={{
                                        width: "100%",
                                        padding: "6px",
                                        borderRadius: "5px",
                                        border: "1px solid #D4AF37",
                                        background: "#000",
                                        color: "#fff",
                                        fontSize: "0.85rem",
                                        resize: "vertical",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "flex-start",
                                    marginTop: "5px",
                                }}
                            >
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
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {editingEventId ? "עדכון אירוע" : "שמירת אירוע"}
                                </button>

                                <button
                                    onClick={closeModal}
                                    style={{
                                        backgroundColor: "#555",
                                        color: "#fff",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    סגירה
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                style={{
                    marginTop: "30px",
                    padding: "15px",
                    background: "#000",
                    border: "1px solid #D4AF37",
                    borderRadius: "10px",
                }}
            >
                <h3 style={{ color: "#D4AF37", margin: "0 0 10px 0" }}>
                    רשימת אירועי החודש
                </h3>

                {monthEvents.length === 0 ? (
                    <div style={{ color: "#999", padding: "10px 0" }}>
                        אין אירועים החודש
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {monthEvents.map((ev) => (
                            <div
                                key={ev.id}
                                onClick={() => {
                                    const [y, m, d] = ev.dateKey.split("-").map(Number);
                                    openModal(d);
                                }}
                                style={{
                                    backgroundColor: ev.category
                                        ? categoryColors[ev.category].bg
                                        : "#111",
                                    color: ev.category
                                        ? categoryColors[ev.category].text
                                        : "#fff",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    border: "1px solid #333",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                }}
                            >
                                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                                    {ev.title}
                                </div>

                                <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                                    📅 {ev.dateLabel}
                                </div>

                                <div style={{ fontSize: "0.8rem" }}>
                                    🕒 {ev.startTime || "—"} - {ev.endTime || "—"}
                                </div>

                                {ev.notes && (
                                    <div style={{ fontSize: "0.8rem" }}>
                                        📝 {ev.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default CalendarGrid;