import React, { useEffect, useState } from "react";

const Countdown = () => {
  const graduationDate = new Date("2026-02-22T00:00:00");

  const calcTimeLeft = () => {
    const now = new Date();
    const diff = graduationDate - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#D4AF37" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        🎓 ספירה לאחור לגמר!
      </h1>
      <h2 style={{ fontSize: "1.5rem" }}>
        {timeLeft.days} ימים, {timeLeft.hours} שעות, {timeLeft.minutes} דקות,{" "}
        {timeLeft.seconds} שניות
      </h2>
    </div>
  );
};

export default Countdown;