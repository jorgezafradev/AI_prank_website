# Totally Legitimate Portal (React + Tailwind prank site)

A 4-stage prank site built with **React 18**, **Tailwind CSS 3**, **Vite** and **HTML5**.

1. A loading bar that fills slowly, then runs backwards, with funny fading messages
2. A "Click to continue" button that runs away 3 times
3. An alien "Terms of Cosmic Service" you can only pass by ticking "I accept but no idea why"
4. A "Do not close me" pop-up that multiplies until the 5th close, then confetti

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev      # opens a dev server (usually http://localhost:5173)
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Files

```
index.html              HTML5 shell, fonts, <div id="root">
tailwind.config.js      Theme: colors, fonts, keyframes
postcss.config.js       Runs Tailwind + Autoprefixer
vite.config.js          Vite + React plugin
src/main.jsx            Mounts <App /> into #root
src/index.css           Tailwind directives + light/dark color variables
src/App.jsx             Holds the current stage in state
src/components/
  Card.jsx, Button.jsx  Small reusable UI pieces
  LoadingStage.jsx      Stage 1
  CatchStage.jsx        Stage 2
  AgreementStage.jsx    Stage 3
  WelcomeStage.jsx      Stage 4 (pop-up logic)
  Popup.jsx             A single pop-up window
  WinStage.jsx          Congratulations page
  Confetti.jsx          Canvas confetti
```

## Easy tweaks

- Pop-up rules: `SPAWN_PER_CLOSE` and `CLOSES_TO_WIN` at the top of `WelcomeStage.jsx`
- Number of runaway dodges: `MAX_DODGES` in `CatchStage.jsx`
- Loading speed: `PHASE_MS` in `LoadingStage.jsx`
- Messages: the `FORWARD` / `BACKWARD` arrays, `TAUNTS`, `LINES`, and `CLAUSES`
- Colors: the CSS variables at the top of `src/index.css`
