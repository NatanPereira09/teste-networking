import Link from "next/link";

export default function NavButton({ href, children }) {
  return (
    <Link
      href={href}
      className="block w-full text-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-colors"
    >
      {children}
    </Link>
  );
}
