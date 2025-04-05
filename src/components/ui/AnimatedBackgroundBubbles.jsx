import React, { useEffect, useState } from "react";

const AnimatedBackgroundBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate initial bubbles
    const initialBubbles = [];
    for (let i = 0; i < 10; i++) {
      initialBubbles.push(generateBubble());
    }
    setBubbles(initialBubbles);

    // Add new bubbles periodically
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const nextBubbles = [...prev];

        // Remove bubbles that have expired
        const activeBubbles = nextBubbles.filter(
          (bubble) => Date.now() < bubble.createdAt + bubble.lifetime
        );

        // Add a new bubble if we're below the limit
        if (activeBubbles.length < 10) {
          activeBubbles.push(generateBubble());
        }

        return activeBubbles;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateBubble = () => {
    const size = Math.floor(Math.random() * 150) + 50;
    const xPos = Math.floor(Math.random() * 100);
    const delay = Math.floor(Math.random() * 5);
    const duration = Math.floor(Math.random() * 10) + 15;
    const opacity = (Math.floor(Math.random() * 4) + 1) / 10;

    return {
      id: Date.now() + Math.random(),
      size,
      xPos,
      delay,
      duration,
      opacity,
      createdAt: Date.now(),
      lifetime: duration * 1000 + delay * 1000 + 1000, // Add extra time to ensure bubble is off-screen
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 dark:from-blue-600/20 dark:to-indigo-600/20 blur-xl"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.xPos}%`,
            bottom: `-${bubble.size}px`,
            opacity: bubble.opacity,
            animation: `float ${bubble.duration}s ease-in ${bubble.delay}s forwards`,
          }}
        />
      ))}

      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${window.innerHeight + 200}px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackgroundBubbles;
