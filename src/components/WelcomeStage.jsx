import { useEffect, useRef, useState } from "react";
import Popup from "./Popup.jsx";

// Tweak the prank here:
const SPAWN_PER_CLOSE = 3; // new pop-ups created every time one is closed
const CLOSES_TO_WIN = 5; // closing this many pop-ups ends the prank

const LINES = [
  "Do not close me",
  "Seriously, don't",
  "I have a family in here",
  "You closed my brother!",
  "Fine. We are many now.",
  "Pop-up union, assemble!",
  "Why would you do this?",
  "We can do this all day",
  "Please. I'm begging.",
  "That X is not a toy",
  "Still here. Still popping.",
  "Is this what you wanted?",
  "Not me again",
];

const rand = (a, b) => a + Math.random() * (b - a);

export default function WelcomeStage({ onDone }) {
  // State = what the screen shows (the list of open pop-ups).
  const [popups, setPopups] = useState([]);

  // Refs = bookkeeping that should NOT cause a re-render.
  const closed = useRef(0);
  const nextId = useRef(1);
  const zTop = useRef(10);
  const lineIdx = useRef(1);
  const closing = useRef(new Set());
  const finished = useRef(false);
  const timers = useRef([]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  function spawn(text, center = false) {
    const w = Math.min(300, window.innerWidth - 24);
    const popup = {
      id: nextId.current++,
      text,
      center,
      leaving: false,
      z: ++zTop.current,
      rot: center ? 0 : Math.round(rand(-5, 5) * 10) / 10,
      x: rand(10, Math.max(10, window.innerWidth - w - 14)),
      y: rand(14, Math.max(14, window.innerHeight - 170)),
    };
    // Functional update: build the new array from the previous one
    setPopups((prev) => [...prev, popup]);
  }

  // Show the very first pop-up shortly after the welcome page appears
  useEffect(() => {
    later(() => spawn(LINES[0], true), 900);
    return () => timers.current.forEach(clearTimeout); // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closePopup(id) {
    if (finished.current || closing.current.has(id)) return;
    closing.current.add(id);
    closed.current += 1;

    // Play the "leave" animation, then remove it from the list
    setPopups((prev) => prev.map((p) => (p.id === id ? { ...p, leaving: true } : p)));
    later(() => setPopups((prev) => prev.filter((p) => p.id !== id)), 180);

    if (closed.current >= CLOSES_TO_WIN) {
      finished.current = true;
      onDone(); // tell <App /> to show the congratulations page
      return;
    }

    for (let i = 0; i < SPAWN_PER_CLOSE; i++) {
      later(() => spawn(LINES[lineIdx.current++ % LINES.length]), 120 + i * 140);
    }
  }

  function bringToFront(id) {
    const z = ++zTop.current;
    setPopups((prev) => prev.map((p) => (p.id === id ? { ...p, z } : p)));
  }

  return (
    <>
      <div className="max-w-[560px] text-center">
        <h1 className="text-[clamp(2rem,7vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
          Welcome aboard, Earthling.
        </h1>
        <p className="mt-3.5 font-serif text-[1.2rem] text-soft">
          Your account is ready. Please enjoy this completely normal page and ignore anything
          that appears in front of it.
        </p>
      </div>

      {/* The pop-up layer floats above everything */}
      <div className="pointer-events-none fixed inset-0 z-[100]" aria-live="polite">
        {popups.map((p) => (
          <Popup
            key={p.id}
            popup={p}
            onClose={() => closePopup(p.id)}
            onFocus={() => bringToFront(p.id)}
          />
        ))}
      </div>
    </>
  );
}
