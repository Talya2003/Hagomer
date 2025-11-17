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

      <nav>
        {/* קישורים נכניס בהמשך */}
      </nav>
    </header>
  );
};

export default Header;