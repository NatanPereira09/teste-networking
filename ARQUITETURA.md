# Arquitetura — Plataforma de Gestão para Grupos de Networking

> Documento de arquitetura para o teste técnico — plataforma de gestão de membros, indicações e monitoramento de performance.

---

## 1. Visão Geral

A solução é uma aplicação **Fullstack** composta por:

- **Frontend**: Next.js (React) — páginas públicas e privadas; SSR/SSG quando apropriado.
- **Backend**: API REST (Next.js API Routes ou Express) — endpoints para intenções, membros, admin, indicações e dashboards.
- **Banco de dados**: **PostgreSQL** (produção) / **SQLite** (desenvolvimento/testes). Usei **Prisma** como ORM para maior produtividade.
- **Autenticação/Autorização**: Area administrativa protegida por variável de ambiente (apenas para o escopo do teste). Convites com token únicos para cadastro.
- **Testes**: Jest + React Testing Library para frontend; Jest + supertest para endpoints.

## 2. Diagrama de Arquitetura (Mermaid)

```mermaid
flowchart LR
  subgraph Client
    A[Browser - Next.js pages]
  end
  subgraph Frontend
    A --> B[Next.js (pages / app)]
  end
  subgraph API
    B --> C[API Routes (Node.js) / Express]
  end
  subgraph DB
    C --> D[(Postgres / SQLite via Prisma)]
  end
  C --> E[Email / Notifications (simulado)]
  C --> F[File storage (S3 ou local)]
```

## 3. Modelo de Dados (Prisma Schema / SQL)

Escolha: **Relacional (PostgreSQL / SQLite)** — facilita consultas, joins para relatórios e integridade referencial.

### Principais tabelas / entidades

- **Intentions** — submissões públicas de intenção de participação.
  - id, name, email, company, message, status (PENDING / APPROVED / REJECTED), createdAt, updatedAt, processedBy, processedAt

- **Invitations** — token gerado ao aprovar intenção.
  - id, intentionId, token, expiresAt, used (boolean), createdAt

- **Members** — cadastro completo de membros.
  - id, name, email, company, phone, role, joinedAt, active (boolean), invitationId

- **Indications** — (opcional - se implementar sistema de indicações)
  - id, fromMemberId, toMemberId, title, description, value, status (OPEN / CONTACTED / WON / LOST), createdAt

- **Meetings**
  - id, title, date, location, notes

- **Attendance**
  - id, meetingId, memberId, status (PRESENT / ABSENT / EXCUSED), checkInAt

- **Thanks (Obrigados)**
  - id, fromMemberId, toMemberId, description, createdAt

- **Payments**
  - id, memberId, amount, dueDate, status (PENDING / PAID / LATE), createdAt

### Exemplo (Prisma simplified)

```prisma
model Intention {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  company   String?
  message   String?
  status    String   @default("PENDING")
  processedBy String?
  processedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  invitation Invitation?
}

model Invitation {
  id          Int      @id @default(autoincrement())
  token       String   @unique
  intention   Int      @unique
  expiresAt   DateTime
  used        Boolean  @default(false)
  createdAt   DateTime @default(now())
  Intention   Intention @relation(fields: [intention], references: [id])
}

model Member {
  id           Int @id @default(autoincrement())
  name         String
  email        String @unique
  company      String?
  phone        String?
  role         String?
  joinedAt     DateTime @default(now())
  active       Boolean @default(true)
  invitationId Int?
}
```

## 4. Estrutura de Componentes (Frontend)

Projeto Next.js com organização por features + componentes compartilhados.

```
/src
  /components
    /forms
      IntentForm.jsx
      MemberSignupForm.jsx
    /ui
      Button.jsx
      Input.jsx
      Modal.jsx
    /admin
      IntentList.jsx
      IntentItem.jsx
  /pages
    /api
      intents.js
      admin/intents.js
      signup/[token].js
    index.jsx            // Home
    /intention.jsx       // Form public
    /admin/index.jsx     // Admin area
    /signup/[token].jsx  // Signup page via token
  /lib
    prisma.ts
    auth.ts
  /utils
    emailSimulator.ts
  /styles
```

**Estado global**: `React Context` (Cartões, auth mínima) ou `SWR` para fetch e cache; não é necessário Redux.

**Reutilização**: inputs e botões genéricos; formulários desacoplados do transporte de dados (hooks `useIntention`, `useInvitation`).

## 5. Definição da API (principais endpoints)

> Todos retornam JSON. Exemplos com REST.

### 1. `POST /api/intents` — enviar intenção
- **Request**: `{ name, email, company?, message? }`
- **Response 201**: `{ id, status: 'PENDING' }`

### 2. `GET /api/admin/intents` — listar intenções (admin protected)
- **Headers**: `x-admin-key: <ADMIN_KEY>` (variável de ambiente)
- **Response**: `[{ id, name, email, company, status, createdAt }]`

### 3. `POST /api/admin/intents/:id/approve` — aprovar intenção
- **Response**: `{ invitationToken, invitationLink }`
  - cria registro em `Invitation` com token (UUID) e `expiresAt` (ex: 7 dias)

### 4. `POST /api/admin/intents/:id/reject`
- **Response**: `{ ok: true }`

### 5. `GET /api/invite/:token` — validar token
- **Response 200**: `{ valid: true, intentionId, email }`

### 6. `POST /api/signup` — completar cadastro via token
- **Request**: `{ token, name, email, phone, company, password? }`
- **Response 201**: `{ memberId }`

### 7. (Opcional) Indicações
- `POST /api/indications` — criar indicação
- `GET /api/members/:id/indications` — ver indicações feitas/recebidas
- `PATCH /api/indications/:id` — atualizar status

## 6. Fluxos principais

1. **Enviar intenção** → ADMIN aprova → API cria `Invitation` (token) → Admin copia link ou sistema simula envio por e‑mail mostrando link → usuário acessa `/signup/<token>` → completa cadastro → `Member` criado.

2. **Admin area** protege por `x-admin-key` ou `ADMIN_KEY` em env; no teste pode-se usar proteção simples.

## 7. Testes (abordagem)

- Frontend: tests para `IntentForm` (validação e submit), `MemberSignupForm`.
- Backend: testes para endpoints `POST /api/intents`, `POST /api/admin/intents/:id/approve`, `GET /api/invite/:token`, `POST /api/signup`.

## 8. Observações de Infra & Deploy

- **Desenvolvimento**: Next.js + SQLite local com Prisma.
- **Produção**: Postgres + Vercel (frontend) + PlanetScale/Heroku for DB or DigitalOcean; Migration via `prisma migrate`.
- **Env vars**: DATABASE_URL, ADMIN_KEY, NEXTAUTH_SECRET (se usar), TOKEN_EXPIRES_DAYS.
