import { useEffect, useState } from "react";
import Card from "./Card.jsx";

const FORWARD = [
  "Warming up the pixels…",
  "Teaching the hamsters to run faster…",
  "Downloading more RAM…",
];
const BACKWARD = [
  "Wait, something is off. Rewinding.",
  "Un-downloading the RAM we just got…",
  "Okay, we're calling this loaded anyway.",
];
const PHASE_MS = 10500; // how long each direction takes
const FADE_MS = 1200; // slow message fade

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function LoadingStage({ onDone }) {
  // useState: values that, when changed, make React re-render the component.
  const [progress, setProgress] = useState(0);
  const [goingBack, setGoingBack] = useState(false);
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  // useEffect with [] runs once after the first render (a good place to start timers).
  // The function it returns is the CLEANUP: it runs when the component unmounts,
  // so we stop everything and avoid updating state on a component that's gone.
  useEffect(() => {
    let cancelled = false;
    let raf;
    const timers = [];

    const sleep = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));

    // Animate progress from one number to another using requestAnimationFrame
    const tween = (from, to, dur) =>
      new Promise((resolve) => {
        const start = performance.now();
        const frame = (now) => {
          if (cancelled) return;
          const t = Math.min(1, (now - start) / dur);
          setProgress(from + (to - from) * ease(t));
          if (t < 1) raf = requestAnimationFrame(frame);
          else resolve();
        };
        raf = requestAnimationFrame(frame);
      });

    // Fade the current message out, swap the text, fade it back in
    const swapMessage = (text) => {
      setMessageVisible(false);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setMessage(text);
          setMessageVisible(true);
        }, FADE_MS)
      );
    };

    const runPhase = async (messages, from, to) => {
      messages.forEach((m, i) =>
        timers.push(setTimeout(() => swapMessage(m), (i * PHASE_MS) / 3))
      );
      await tween(from, to, PHASE_MS);
    };

    (async () => {
      await sleep(500);
      await runPhase(FORWARD, 0, 100);
      await sleep(900);
      setGoingBack(true);
      await runPhase(BACKWARD, 100, 0);
      await sleep(1500);
      if (!cancelled) onDone();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rounded = Math.round(progress);

  return (
    <Card className="max-w-[520px]">
      <div
        aria-hidden="true"
        className="font-display text-[clamp(4.5rem,22vw,7.5rem)] font-extrabold leading-[.9] tracking-[-.05em] tabular-nums"
      >
        {rounded}
        <span className="ml-1 text-[.38em] tracking-normal text-soft">%</span>
      </div>

      <p className="mb-[18px] mt-[10px] min-h-[1.5em] text-soft">
        {goingBack ? "Un-loading…" : "Loading…"}
      </p>

      <div
        role="progressbar"
        aria-label="Loading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        className="h-[22px] overflow-hidden rounded-full border border-line bg-paper"
      >
        {/* The bar's width comes straight from state; the color flips when it goes backwards */}
        <div
          className={`h-full rounded-full transition-colors duration-[1400ms] ${
            goingBack ? "bg-magenta" : "bg-teal"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        aria-live="polite"
        className={`mt-[22px] min-h-[3.2em] font-serif text-xl italic transition-opacity duration-[1200ms] ${
          messageVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {message}
      </p>
    </Card>
  );
}
