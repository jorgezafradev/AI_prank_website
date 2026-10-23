import { useState } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

// Data lives in an array, and JSX turns it into elements with .map()
const CLAUSES = [
  ["1. Definitions", "\"You\" means the carbon-based unit currently holding this device. \"We\" means the Council of Seven Moons, plus Greg, who handles the paperwork."],
  ["2. Abduction policy", "You agree that any abduction occurring between 2 a.m. and 4 a.m. is purely educational. Cows are excluded from this clause but have their own, much longer, document."],
  ["3. Crop circles", "You will not claim credit for crop circles that you did not personally create. You will also not claim credit for the ones you did create. Nobody was ever here."],
  ["4. Probing", "Any probing is done in the spirit of friendship and is not covered by your dental plan, your health plan, or the Geneva Conventions of any planet."],
  ["5. Language", "Humming at frequencies above 40 kHz constitutes a binding verbal contract on Neptune, Kepler-22b, and in parts of Ohio."],
  ["6. Snacks", "You agree to leave one (1) sandwich on the roof every full moon. The sandwich should be sincere. Pickles are optional but encouraged."],
  ["7. Telepathy", "If you hear a voice saying \"blorp\", that is a legal notice. Respond with a thumbs up within 12 Earth days or 3 Martian lunches, whichever is smaller."],
  ["8. Refund policy", "There is no refund policy. There is only the Void. The Void does not take returns."],
  ["9. Final clause", "By continuing, you confirm that you have read all of the above, understood none of it, and are fine with that."],
];

export default function AgreementStage({ onDone }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <Card className="max-w-[640px]">
      <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-extrabold leading-[1.05] tracking-tight">
        Terms of Cosmic Service
      </h2>
      <p className="mb-[18px] mt-1.5 text-soft">
        Please read everything very carefully. We will know if you didn't.
      </p>

      <div
        tabIndex={0}
        role="region"
        aria-label="Terms of Cosmic Service"
        className="h-[min(46vh,340px)] max-w-[70ch] overflow-y-auto rounded-[14px] border border-line bg-paper px-5 py-[18px] font-serif text-[1.05rem] leading-relaxed"
      >
        {CLAUSES.map(([title, text]) => (
          <section key={title} className="mb-4 last:mb-0">
            <h3 className="font-display text-base font-bold">{title}</h3>
            <p>{text}</p>
          </section>
        ))}
      </div>

      {/* Controlled input: the checkbox always shows what `accepted` says */}
      <label className="my-[22px] flex cursor-pointer items-center gap-3.5 rounded-[14px] border-2 border-dashed border-line p-4 transition-colors hover:border-magenta">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-lg border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-sun ${
            accepted ? "border-teal bg-teal" : "border-ink bg-card"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-5 w-5 fill-none stroke-white stroke-[3.5] transition-opacity ${
              accepted ? "opacity-100" : "opacity-0"
            }`}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <b className="font-bold">I accept but no idea why</b>
      </label>

      {/* The button is disabled until the box is ticked */}
      <Button variant="secondary" disabled={!accepted} onClick={onDone}>
        Sign and continue
      </Button>
    </Card>
  );
}
