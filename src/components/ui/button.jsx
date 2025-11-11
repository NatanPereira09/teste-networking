export default function Button({ children, onClick, type = "button", color = "indigo", disabled = false }) {
  const base = `px-4 py-2 rounded-lg font-medium transition-colors`;
  const colors = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${colors[color]} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
