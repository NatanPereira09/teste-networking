# Next Networking – Teste Técnico Desenvolvedor

Este projeto foi desenvolvido como parte do **teste técnico** para a vaga de Desenvolvedor, atendendo todos os requisitos do documento enviado.

A aplicação foi construída com **Next.js (React)**, **Prisma ORM** e **Tailwind CSS**, utilizando **SQLite** como banco de dados local para simplicidade no ambiente de avaliação.

---

## Visão Geral

A plataforma simula um sistema de **rede de contatos empresariais**, com três fluxos principais:

1. **Intenções** — visitantes podem enviar um pedido de participação.
2. **Administração** — o administrador pode aprovar ou rejeitar intenções, gerando convites automáticos.
3. **Cadastro via Convite** — convidados completam o cadastro na plataforma.
4. **Indicações** — membros podem indicar novos contatos, simulando o crescimento da rede.

---

## Tecnologias Utilizadas

- **Next.js** – Framework React com suporte nativo a rotas e APIs.  
- **Prisma ORM** – Mapeamento objeto-relacional para acesso ao banco.  
- **SQLite** – Banco de dados leve e embarcado.  
- **Tailwind CSS** – Estilização rápida e responsiva.  
- **React Hooks** – Para controle de estado e efeitos.  

---



## Instalação e Execução

### 1- Clonar o repositório
```bash
git clone https://github.com/natanpmendes/next-network.git
cd next-network

2- Instalar dependências
npm install

3- Configurar variáveis de ambiente

Crie o arquivo .env na raiz do projeto:

DATABASE_URL="file:./dev.db"
ADMIN_KEY="12345"


(a chave ADMIN_KEY é usada na tela de administração)

4- Rodar as migrações do banco
npx prisma migrate dev --name init

5- Rodar a aplicação
npm run dev


Abra o navegador e acesse:

http://localhost:3000

Estrutura de Páginas
Rota	Descrição
/	Página inicial com acesso rápido às seções principais.
/intention	Formulário para envio de intenção de participação.
/admin	Área administrativa protegida por ADMIN_KEY.
/admin/invitations	Lista de convites gerados (simulados).
/signup?token=xxxx	Página de cadastro a partir de um convite.
/indications	Registro e visualização de indicações entre membros.
