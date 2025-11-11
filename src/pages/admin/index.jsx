import { useState } from "react";
import IntentList from "../../components/admin/intentList";
import Button from "../../components/ui/button";
import BackHomeButton from "../../components/ui/backHomeButton";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [intents, setIntents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invitationLink, setInvitationLink] = useState(null);

  async function loadIntents() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/intents", {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) throw new Error("Chave incorreta ou falha na API.");
      const data = await res.json();
      setIntents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    const res = await fetch(`/api/admin/intents/${id}/approve`, {
      method: "POST",
      headers: { "x-admin-key": key },
    });

    if (res.ok) {
      const j = await res.json();
      setInvitationLink(j.invitationLink);
      loadIntents();
    } else {
      alert("Erro ao aprovar.");
    }
  }

  async function handleReject(id) {
    const res = await fetch(`/api/admin/intents/${id}/reject`, {
      method: "POST",
      headers: { "x-admin-key": key },
    });
    if (res.ok) {
      alert("Intenção rejeitada.");
      loadIntents();
    } else {
      alert("Erro ao rejeitar.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Área Administrativa
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Visualize e gerencie as intenções enviadas.
        </p>

        <div className="flex gap-2 mt-4">
          <input
            type="password"
            placeholder="Chave de acesso (ADMIN_KEY)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
          />
          <Button onClick={loadIntents} disabled={loading}>
            {loading ? "Carregando..." : "Carregar"}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <IntentList
          intents={intents}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {invitationLink && (
          <div className="mt-6 p-4 border border-indigo-200 rounded-lg bg-indigo-50 text-center">
            <p className="font-medium text-indigo-700 mb-2">
              Convite gerado com sucesso 🎉
            </p>
            <a
              href={invitationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline break-all hover:text-indigo-800 transition"
            >
              {invitationLink}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(invitationLink);
                alert("Link copiado para a área de transferência!");
              }}
              className="block mx-auto mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Copiar link
            </button>
          </div>
        )}
        <BackHomeButton />
      </section>
    </main>
  );
}
