import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // Default roles if no text is provided
  const dataText = text ? (Array.isArray(text) ? text : [text]) : [
    "AI Engineer",
    "CS Student",
    "Voltron Enjoyer",
    "Greek Yogurt Connoisseur"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % dataText.length;
      const fullText = dataText[i];

      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      // Typing Speed
      let typeSpeed = speed;
      if (isDeleting) typeSpeed /= 2;

      // Determine next state
      if (!isDeleting && displayedText === fullText) {
        // Finished typing
        if (dataText.length === 1) {
          // If only one string, stop here (don't delete)
          return;
        }
        // Pause before deleting
        typeSpeed = 1500;
        setIsDeleting(true);
      } else if (isDeleting && displayedText === "") {
        // Finished deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      setTimeout(handleTyping, typeSpeed);
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, dataText, speed]);

  return (
    <span className="typewriter">
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default TypewriterText; 