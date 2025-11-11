import { useState } from "react";
import Input from "../components/form/input";
import Textarea from "../components/form/textarea";
import BackHomeButton from "../components/ui/backHomeButton";

export default function IntentionPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [ok, setOk] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/intents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setOk("Enviado! Aguarde contato.");
      setForm({ name: "", email: "", company: "", message: "" });
    } else {
      const j = await res.json();
      setOk("Erro: " + (j.error || res.statusText));
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Quero participar
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Preencha o formulário abaixo e entraremos em contato em breve.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Seu melhor e-mail"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            name="company"
            label="Empresa"
            placeholder="(opcional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <Textarea
            name="message"
            label="Mensagem"
            placeholder="Conte-nos brevemente sobre você"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2 transition-colors"
          >
            Enviar intenção
          </button>
        </form>

        {ok && (
          <p
            className={`text-center text-sm font-medium ${
              ok.startsWith("Erro") ? "text-red-500" : "text-green-600"
            }`}
          >
            {ok}
          </p>
        )}
        <BackHomeButton />
      </section>
    </main>
  );
}
