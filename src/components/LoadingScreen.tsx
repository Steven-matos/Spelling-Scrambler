import React, { useEffect, useState } from "react";
import "../assets/LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  const [scrambledText, setScrambledText] = useState("Scrambling Words...");
  const originalText = "Scrambling Words...";
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!.0123456789";
  let iteration = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrambledText((prev) =>
        originalText
          .split("")
          .map((char, i) => {
            if (i < iteration) {
              return originalText[i];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      iteration += 1 / 3;
      if (iteration >= originalText.length) {
        iteration = 0; // Reset iteration to loop the effect
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="scramble-text">{scrambledText}</div>
    </div>
  );
};

export default LoadingScreen;
