import { useRouter } from "next/router";

export default function BackHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="mt-6 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-200"
    >
      Voltar à Página Inicial
    </button>
  );
}
