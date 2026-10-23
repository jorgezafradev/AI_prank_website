// Reusable button. `variant` picks the color, `...rest` forwards everything else
// (onClick, disabled, ref-less props, aria labels...) to the real <button>.
const VARIANTS = {
  primary: "bg-magenta",
  secondary: "bg-teal",
};

export default function Button({ variant = "primary", className = "", children, ...rest }) {
  return (
    <button
      type="button"
      className={`cursor-pointer whitespace-nowrap rounded-2xl px-6 py-4 text-lg font-extrabold text-white shadow-[0_5px_0_rgba(0,0,0,.25)] transition-[filter,box-shadow] hover:brightness-110 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:brightness-100 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
