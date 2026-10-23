// A tiny reusable component. `children` is whatever you put between <Card> and </Card>.
export default function Card({ className = "", children }) {
  return (
    <div
      className={`w-full rounded-[22px] border border-line bg-card p-7 shadow-card sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
