import NavButton from "../components/navButton";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-indigo-600">
          Next Networking
        </h1>
        <p className="text-gray-600">
          Plataforma de gestão de membros e indicações da comunidade.
        </p>

        <div className="flex flex-col space-y-3 mt-6">
          <NavButton href="/intention">Enviar intenção</NavButton>
          <NavButton href="/admin">Área Admin</NavButton>
          <NavButton href="/admin/invitations">Convites (simulados)</NavButton>
        </div>

        <footer className="text-xs text-gray-400 mt-8">
          Desenvolvido por <span className="font-medium text-indigo-500">Natan Pereira</span>
        </footer>
      </section>
    </main>
  );
}
