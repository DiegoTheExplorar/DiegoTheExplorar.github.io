import React, { useState, useEffect, useMemo } from 'react';

const TypewriterText = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(speed);

  // Memoize dataText to prevent recreation on every render
  const dataText = useMemo(() => {
    if (text) {
      return Array.isArray(text) ? text : [text];
    }
    return [
      "AI Engineer",
      "CS Student",
      "Voltron Enjoyer",
      "Greek Yogurt Connoisseur"
    ];
  }, [text]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [displayedText, delta, isDeleting, loopNum, dataText]);

  const tick = () => {
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    if (isDeleting) {
      setDisplayedText(fullText.substring(0, displayedText.length - 1));
      setDelta(speed / 2);
    } else {
      setDisplayedText(fullText.substring(0, displayedText.length + 1));
      setDelta(speed);
    }

    if (!isDeleting && displayedText === fullText) {
      setIsDeleting(true);
      setDelta(1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <span className="typewriter">
      {displayedText}
      <span className="typewriter-cursor"></span>
    </span>
  );
};

export default TypewriterText; 