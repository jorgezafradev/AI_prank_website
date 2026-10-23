import { useEffect, useRef, useState } from "react";
import Card from "./Card.jsx";

const MAX_DODGES = 3;
const TAUNTS = [
  "Too slow.",
  "Nope. Not today.",
  "Third time's the charm… for me.",
  "Okay, okay. You earned it.",
];
const rand = (a, b) => a + Math.random() * (b - a);

export default function CatchStage({ onDone }) {
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // how far the button is moved from home
  const [taunt, setTaunt] = useState("");

  // useRef: a box that keeps its value between renders WITHOUT triggering a re-render.
  // Perfect for DOM elements and for flags like "busy".
  const homeRef = useRef(null);
  const btnRef = useRef(null);
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  function dodge() {
    if (dodges >= MAX_DODGES || busy.current) return;
    busy.current = true;

    const home = homeRef.current.getBoundingClientRect();
    const size = btnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const m = 16;
    const curX = home.left + offset.x;
    const curY = home.top + offset.y;

    // Pick a random spot inside the screen, far enough from where we are now
    let x, y, tries = 0;
    do {
      x = rand(m, Math.max(m, vw - size.width - m));
      y = rand(m + 8, Math.max(m + 8, vh - size.height - m));
      tries++;
    } while (Math.hypot(x - curX, y - curY) < Math.min(vw, vh) * 0.3 && tries < 30);

    // We move the button with a CSS transform, so it glides (see the transition class below)
    setOffset({ x: x - home.left, y: y - home.top });

    const next = dodges + 1;
    setDodges(next);
    setTaunt(TAUNTS[next - 1]);

    later(() => (busy.current = false), 450);

    if (next === MAX_DODGES) {
      // After the third escape, the button gives up and glides back home
      later(() => {
        setOffset({ x: 0, y: 0 });
        setTaunt(TAUNTS[3]);
      }, 1150);
    }
  }

  function handleClick(e) {
    if (dodges < MAX_DODGES) {
      // Touch taps and keyboard presses end up here, so they dodge too
      e.preventDefault();
      dodge();
    } else {
      onDone();
    }
  }

  return (
    <Card className="max-w-[520px]">
      <h1 className="text-[clamp(2rem,7vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
        Loading complete.
      </h1>
      <p className="mt-3 text-soft">Somehow. The next step is one simple click.</p>

      <div ref={homeRef} className="mt-7 flex h-16 items-start">
        <button
          ref={btnRef}
          type="button"
          onPointerEnter={(e) => e.pointerType !== "touch" && dodge()}
          onClick={handleClick}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="relative z-50 cursor-pointer whitespace-nowrap rounded-2xl bg-magenta px-6 py-4 text-lg font-extrabold text-white shadow-[0_5px_0_rgba(0,0,0,.25)] transition-transform duration-[380ms] ease-[cubic-bezier(.2,1.4,.4,1)] motion-reduce:duration-75"
        >
          {dodges >= MAX_DODGES ? "Fine. Continue." : "Click to continue"}
        </button>
      </div>

      <p aria-live="polite" className="mt-[18px] min-h-[1.5em] font-serif text-lg italic text-soft">
        {taunt}
      </p>

      {/* One dot per escape. Rendering a list from an array: always give each item a `key` */}
      <div className="mt-[18px] flex gap-2" aria-hidden="true">
        {Array.from({ length: MAX_DODGES }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full border transition-all duration-300 ${
              i < dodges ? "scale-125 border-sun bg-sun" : "border-line bg-paper"
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
