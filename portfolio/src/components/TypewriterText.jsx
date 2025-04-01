import React, { useState, useEffect } from 'react';

const roles = [
  "AI Engineer",
  "CS Student",
  "Voltron Enjoyer",
  "Greek Yogurt Connoisseur"
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const type = () => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }
      
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      
      const delta = isDeleting ? 50 : 100;
      
      setTimeout(() => {
        setText(prev => 
          isDeleting 
            ? prev.slice(0, -1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, delta);
    };
    
    const timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [text, roleIndex, isDeleting]);
  
  return <span className="typewriter">{text}</span>;
};

export default TypewriterText; 