# Arquitetura do Projeto – Next Networking

O projeto foi desenvolvido com base em uma estrutura simples e organizada, separando bem as responsabilidades entre o front-end, o back-end e o acesso ao banco de dados.

---

## Organização geral

O Next.js já permite unir o front e o back na mesma aplicação.  
Eu aproveitei isso para estruturar o sistema de uma forma bem prática:

- **Páginas** (`/pages`) → São as rotas principais da aplicação. Cada arquivo representa uma página acessível pelo navegador.
- **Rotas de API** (`/pages/api`) → Simulam o backend. Aqui estão os endpoints responsáveis por salvar intenções, aprovar convites, cadastrar membros e registrar indicações.
- **Componentes** (`/components`) → São as partes reutilizáveis da interface (inputs, botões, listagens).
- **Banco de dados (Prisma)** → Está definido no arquivo `schema.prisma`, que faz o mapeamento das tabelas.
- **Estilos globais** → Feitos com Tailwind CSS, definidos em `globals.css`.

Essa separação deixa o código limpo e facilita entender onde cada parte atua.

---

## Camadas e responsabilidades

O projeto segue uma estrutura próxima do modelo **MVC**, adaptada para o Next.js:

- **Model** → responsável pela comunicação com o banco via **Prisma ORM**.
- **Controller** → são as rotas dentro de `/api`, que tratam a lógica de negócio.
- **View** → composta pelas páginas e componentes React, responsáveis pela parte visual.

---

## Modelagem de dados

O banco foi feito com **SQLite** e o **Prisma ORM**, pela praticidade durante o teste técnico.  
A modelagem segue o fluxo do sistema:

- **Intent** → intenção de participação enviada por um visitante.
- **Invitation** → convite gerado quando uma intenção é aprovada.
- **Member** → pessoa cadastrada a partir de um convite.
- **Indication** → registro de indicações entre membros da plataforma.

**Relações principais:**
- Uma intenção aprovada gera um convite (1:1).
- Um convite aceito cria um membro.
- Um membro pode indicar outros membros (1:N).

---

## Fluxo geral de dados

1. O usuário envia uma intenção pela página `/intention`.
2. O administrador acessa `/admin`, usa a chave secreta e vê todas as intenções.
3. Quando aprova uma intenção, o sistema cria um convite com um token.
4. O convidado acessa o link do convite e completa o cadastro (vira um membro).
5. Membros podem acessar `/indications` para registrar indicações de novos contatos.

---

## Decisões técnicas

- **Next.js** foi escolhido por integrar facilmente frontend e backend.
- **Tailwind CSS** foi usado pela agilidade e consistência visual.
- **Prisma + SQLite** garantem um banco leve, fácil de configurar e suficiente para o escopo do teste.
- A arquitetura é modular, então seria simples migrar para PostgreSQL ou MySQL no futuro.

---

## Diagrama conceitual (simplificado)

Intention --(aprovada)--> Invitation --(token usado)--> Member --(cria)--> Indication

yaml
Copiar código

---

## Conclusão

A estrutura foi pensada para ser clara, didática e fácil de entender.  
Cada parte cumpre bem o seu papel, e o fluxo reflete exatamente o processo descrito no documento do teste técnico.