import { useState } from "react";
import InvitationItem from "../../components/admin/invitationItem";
import BackHomeButton from "../../components/ui/backHomeButton";

export default function InvitationsPage() {
  const [copied, setCopied] = useState(null);

  const invitations = [
    {
      id: 1,
      name: "Ana Martins",
      email: "ana.martins@email.com",
      company: "TechNova",
      status: "ATIVO",
      link: "https://next-network.vercel.app/signup/abc123",
    },
    {
      id: 2,
      name: "Carlos Souza",
      email: "carlos.souza@email.com",
      company: "WebHouse",
      status: "PENDENTE",
      link: "https://next-network.vercel.app/signup/xyz456",
    },
  ];

  function handleCopy(link) {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Convites gerados
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Abaixo estão os convites ativos e pendentes enviados para novos usuários.
        </p>

        <div className="space-y-4 mt-6">
          {invitations.map((inv) => (
            <InvitationItem
              key={inv.id}
              invitation={inv}
              onCopy={handleCopy}
            />
          ))}
        </div>

        {copied && (
          <p className="text-center text-green-600 text-sm font-medium animate-fadeIn">
            Link copiado para a área de transferência!
          </p>
        )}
        <BackHomeButton />
      </section>
    </main>
  );
}
