import { useEffect, useState } from "react";
import Input from "../components/form/input";
import Button from "../components/ui/button";
import Link from "next/link";
import BackHomeButton from "../components/ui/backHomeButton";

export default function IndicationsPage() {
  const [indications, setIndications] = useState([]);
  const [form, setForm] = useState({
    fromMemberId: "",
    toMemberEmail: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔹 Carrega todas as indicações existentes
  async function loadIndications() {
    try {
      const res = await fetch("/api/indications");
      const data = await res.json();
      setIndications(data);
    } catch (err) {
      console.error("Erro ao carregar indicações:", err);
    }
  }

  useEffect(() => {
    loadIndications();
  }, []);

  // 🔹 Envia nova indicação
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/indications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Indicação registrada com sucesso 🎉");
        setForm({ fromMemberId: "", toMemberEmail: "", description: "" });
        loadIndications();
      } else {
        const j = await res.json();
        setMessage("Erro: " + (j.error || res.statusText));
      }
    } catch (err) {
      setMessage("Erro ao enviar indicação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col items-center justify-start p-6 space-y-6">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Indicações
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Registre e visualize as indicações de clientes e parceiros.
        </p>

        {/* 🔸 Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ID do Membro Indicador"
            placeholder="Ex: 1"
            type="number"
            value={form.fromMemberId}
            onChange={(e) =>
              setForm({ ...form, fromMemberId: e.target.value })
            }
            required
          />
          <Input
            label="Email do Indicado"
            placeholder="Email do cliente ou parceiro"
            type="email"
            value={form.toMemberEmail}
            onChange={(e) =>
              setForm({ ...form, toMemberEmail: e.target.value })
            }
            required
          />
          <Input
            label="Descrição"
            placeholder="Motivo da indicação"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <Button type="submit" color="indigo" disabled={loading}>
            {loading ? "Enviando..." : "Registrar Indicação"}
          </Button>
        </form>

        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.startsWith("Erro") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* 🔹 Listagem */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Indicações recentes
          </h2>
          {indications.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma indicação registrada.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {indications.map((ind) => (
                <li key={ind.id} className="py-3">
                  <p className="text-gray-700">
                    <strong>{ind.fromMember?.name || "—"}</strong> indicou{" "}
                    <strong>{ind.toMember?.email || "—"}</strong>
                  </p>
                  <p className="text-sm text-gray-500">{ind.description}</p>
                  <span
                    className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      ind.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ind.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <BackHomeButton />
      </section>
    </main>
  );
}
