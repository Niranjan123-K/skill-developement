export function Input({ className="", ...props }) {
  return (
    <input
      className={`w-full border rounded-lg px-3 py-2 ${className}`}
      {...props}
    />
  );
}