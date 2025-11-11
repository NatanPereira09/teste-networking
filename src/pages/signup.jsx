import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/form/input";
import Button from "../components/ui/button";
import BackHomeButton from "../components/ui/backHomeButton";

export default function SignupPage() {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token) return;
    async function validate() {
      try {
        const res = await fetch(`/api/invite/${token}`);
        if (res.ok) {
          const j = await res.json();
          setValid(true);
          setForm((f) => ({
            ...f,
            email: j.email || "",
            company: j.company || "",
            name: j.name || "",
          }));
        } else {
          setValid(false);
        }
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    }
    validate();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, token }),
    });
    if (res.ok) {
      setMessage("✅ Cadastro concluído com sucesso! Bem-vindo 🎉");
      setForm({ name: "", email: "", phone: "", company: "" });
    } else {
      const j = await res.json().catch(() => ({}));
      setMessage("❌ Erro: " + (j.error || res.statusText));
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <p className="text-gray-600 text-sm">Validando convite...</p>
      </main>
    );
  }

  if (!valid) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
        <section className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-red-600">Convite inválido</h1>
          <p className="text-gray-600">
            Este link de convite está expirado ou inválido.
          </p>
          <Button color="indigo" onClick={() => router.push("/")}>
            Voltar à página inicial
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Completar cadastro
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Preencha os dados abaixo para concluir seu cadastro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label="Nome completo"
            placeholder="Digite seu nome"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Seu email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            name="phone"
            label="Telefone"
            placeholder="(xx) xxxxx-xxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            name="company"
            label="Empresa"
            placeholder="(opcional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <Button type="submit" color="indigo">
            Finalizar cadastro
          </Button>
        </form>

        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.startsWith("❌") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <BackHomeButton />
      </section>
    </main>
  );
}
