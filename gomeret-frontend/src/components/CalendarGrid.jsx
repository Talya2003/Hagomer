import React from "react";

const CalendarGrid = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // מספר הימים בחודש
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // היום שבו מתחיל החודש (0 = ראשון)
  const firstDay = new Date(year, month, 1).getDay();

  // שמות ימים בעברית
  const daysNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

  // שמות חודשים בעברית
  const monthsNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  const daysArray = [];

  // רווחים לפני תחילת החודש (ליישור נכון)
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // הוספת כל ימי החודש
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

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
      <h2 style={{ color: "#D4AF37", margin: "10px 0" }}>
        📅 {monthsNames[month]} {year}
      </h2>

      {/* שמות ימי השבוע */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginBottom: "10px",
          color: "#D4AF37",
        }}
      >
        {daysNames.map((d, index) => (
          <div key={index} style={{ padding: "5px 0", fontWeight: "bold" }}>
            {d}
          </div>
        ))}
      </div>

      {/* גריד של הימים */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          textAlign: "center",
        }}
      >
        {daysArray.map((day, index) => (
          <div
            key={index}
            style={{
              padding: "10px 0",
              borderRadius: "5px",
              backgroundColor: day ? "#000" : "transparent",
              border: day ? "1px solid #D4AF37" : "none",
              color: "#fff",
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;