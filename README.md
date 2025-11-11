# Next Networking - Teste Técnico

Repositório gerado automaticamente para o teste técnico.
Stack: Next.js + Prisma (SQLite) + Jest.

## Rodando localmente

1. Copie `.env.example` para `.env`
2. Instale dependências:
   ```
   npm install
   ```
3. Geração do Prisma e migração inicial:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Rodar em desenvolvimento:
   ```
   npm run dev
   ```
5. Páginas:
   - Intenção: http://localhost:3000/intention
   - Admin: http://localhost:3000/admin
   - Convites simulados: http://localhost:3000/admin/invitations

Admin key padrão: `admin123` (definida em `.env.example`)

