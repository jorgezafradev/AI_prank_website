import { useState } from "react";
import Button from "./Button.jsx";
import Confetti from "./Confetti.jsx";

export default function WinStage({ onRestart }) {
  const [run, setRun] = useState(1); // increasing this number re-fires the confetti

  return (
    <>
      <Confetti run={run} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[clamp(2.6rem,11vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
          Congratulations!
        </h1>
        <p className="mt-3.5 max-w-[34ch] font-serif text-[1.25rem] text-soft">
          You survived the loading bar, the shy button, the aliens, and every single pop-up.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" onClick={() => setRun((r) => r + 1)}>
            Confetti again
          </Button>
          <Button onClick={onRestart}>Start over</Button>
        </div>
      </div>
    </>
  );
}
