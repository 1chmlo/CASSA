export function Button({ children }) {
  return (
    <button
      className="
    relative inline-flex items-center gap-x-1.5 rounded-md
    bg-indigo-500 px-3 py-1.5 text-sm font-semibold 
    text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2
    focus-visible:outline-2 focus-visible:outline-indigo-500 
    focus-visible:focusring-offset-2 disabled:opacity-50
    disable:cursor-not-allowed
    "
    >
      {children}
    </button>
  );
}

export default Button;
