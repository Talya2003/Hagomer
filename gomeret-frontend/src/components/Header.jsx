import React from "react";

const Header = () => {
    return (
        <header
            style={{
                backgroundColor: "#111",
                color: "#D4AF37",
                padding: "15px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #D4AF37",
                direction: "rtl",
            }}
        >
            <h1 style={{ fontSize: "1.8rem", margin: 0 }}>🎓 טבלת הגומר</h1>
            <nav style={{ display: "flex", gap: "20px" }}>
                <a href="/" style={{ color: "#D4AF37", textDecoration: "none" }}>בית</a>
                <a href="/calendar" style={{ color: "#D4AF37", textDecoration: "none" }}>לוח שנה</a>
                <a href="/jokes" style={{ color: "#D4AF37", textDecoration: "none" }}>בדיחות</a>
            </nav>
        </header>
    );
};

export default Header;