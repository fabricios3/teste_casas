# Hospedagem Nexus

Aplicativo web de gestão de hospedagens (casas, quartos e camas) com reservas hierárquicas, operações e dashboards.

## Stack
- Next.js 14 (App Router), React, TypeScript, Tailwind
- Node.js 20+
- PostgreSQL + Prisma
- Autenticação: NextAuth (sugerido) + RBAC
- Testes: Vitest + Playwright (sugeridos)

## Como rodar (MVP)
```bash
npm install
npm run dev
```

## Artefatos principais
- **Modelos/Prisma:** `prisma/schema.prisma`
- **Seed:** `prisma/seed.ts`
- **OpenAPI:** `docs/openapi.yaml`
- **ERD Mermaid:** `docs/erd.mmd`
- **Pseudocódigo e regras:** `docs/booking-exclusivity.md`

## Observações
- Valores padrão: idioma pt-BR, fuso Europe/Rome, moeda EUR.
- O MVP visual está em `app/page.tsx`.
