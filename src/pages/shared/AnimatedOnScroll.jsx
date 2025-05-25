import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';

const AppearMessage = ({ children }) => {
  const ref = useRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Déclencher l’animation
          setAnimate(true);

          // Supprimer la classe pour qu’elle puisse être rejouée plus tard
          setTimeout(() => setAnimate(false), 1000); // durée de l’animation
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`appear_container ${animate ? 'anime_message' : ''}`}
    >
      {children}
    </div>
  );
};

export default AppearMessage;
