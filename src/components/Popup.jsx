// One pop-up window. It only displays data and reports clicks upward through props.
export default function Popup({ popup, onClose, onFocus }) {
  const { text, center, x, y, rot, leaving, z } = popup;

  // The outer layer is only for positioning. It ignores the mouse so you can click
  // the page underneath; the inner window turns pointer events back on.
  const outerClass = center
    ? "pointer-events-none absolute inset-0 grid place-items-center"
    : "pointer-events-none absolute";
  const outerStyle = center ? { zIndex: z } : { left: x, top: y, zIndex: z };

  return (
    <div className={outerClass} style={outerStyle}>
      <div
        role="dialog"
        aria-label="Message"
        onPointerDown={onFocus}
        // CSS custom property read by the `pop` / `leave` keyframes for the tilt
        style={{ "--rot": `${rot}deg` }}
        className={`pointer-events-auto w-[min(300px,calc(100vw-24px))] overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-hard ${
          leaving ? "animate-leave" : "animate-pop"
        }`}
      >
        <header className="flex items-center justify-between bg-sun py-2 pl-3.5 pr-2 font-extrabold text-[#1f1b3b]">
          <span>Message</span>
          <button
            type="button"
            autoFocus={center}
            aria-label="Close pop-up"
            onClick={onClose}
            className="h-[30px] w-[30px] cursor-pointer rounded-lg border-2 border-[#1f1b3b] bg-white text-lg font-extrabold leading-none text-[#1f1b3b] hover:bg-[#ff7a7a]"
          >
            ×
          </button>
        </header>
        <p className="px-4 pb-[22px] pt-5 text-[1.35rem] font-extrabold leading-[1.15] tracking-tight">
          {text}
        </p>
      </div>
    </div>
  );
}
