export default function Textarea({ label, name, value, onChange, placeholder, required = false }) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
      />
    </div>
  );
}
