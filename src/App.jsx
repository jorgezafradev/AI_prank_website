import { useState } from "react";
import LoadingStage from "./components/LoadingStage.jsx";
import CatchStage from "./components/CatchStage.jsx";
import AgreementStage from "./components/AgreementStage.jsx";
import WelcomeStage from "./components/WelcomeStage.jsx";
import WinStage from "./components/WinStage.jsx";

/*
  App holds ONE piece of state: which stage we're on.
  Each stage is its own component and calls a function it receives
  as a prop (onDone) when it's finished. That's the "lifting state up" pattern:
  the parent decides what comes next, the children just report back.
*/
export default function App() {
  const [stage, setStage] = useState("loading"); // loading | catch | agree | welcome | win
  const [round, setRound] = useState(0); // bumped on "Start over" to remount everything

  return (
    // Changing `key` makes React throw away the old <main> and build a new one,
    // which replays the fade-in animation on every stage change.
    <main
      key={`${round}-${stage}`}
      className="flex min-h-[100dvh] animate-stage-in flex-col items-center justify-center p-6"
    >
      {/* Conditional rendering: only the current stage exists in the DOM */}
      {stage === "loading" && <LoadingStage onDone={() => setStage("catch")} />}
      {stage === "catch" && <CatchStage onDone={() => setStage("agree")} />}
      {stage === "agree" && <AgreementStage onDone={() => setStage("welcome")} />}
      {stage === "welcome" && <WelcomeStage onDone={() => setStage("win")} />}
      {stage === "win" && (
        <WinStage
          onRestart={() => {
            setStage("loading");
            setRound((r) => r + 1);
          }}
        />
      )}
    </main>
  );
}
