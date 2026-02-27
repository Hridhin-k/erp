# ERP MVP — Project Preparation

## 1. Current Starter Analysis

### Tech stack
| Layer | Technology |
|-------|------------|
| Framework | **Next.js 16** (App Router) |
| UI runtime | **React 19** |
| Styling | **Tailwind CSS v4** (PostCSS) |
| Language | **TypeScript** (strict) |
| Linting | ESLint (Next.js config) |

### Existing structure
```
erpmvp/
├── app/
│   ├── layout.tsx      # Root layout, Geist fonts, metadata
│   ├── page.tsx        # Default CTA page (to replace)
│   └── globals.css     # Tailwind import, CSS vars, dark mode
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json       # Path alias: @/* → ./*
└── package.json
```

### What’s already in place
- **Path alias**: `@/*` → project root (e.g. `@/components/...`).
- **Design tokens**: `--background`, `--foreground` in `globals.css`; Tailwind `@theme inline` for `background`/`foreground` and Geist font variables.
- **Dark mode**: `prefers-color-scheme: dark` in CSS (no toggle yet).
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`.

### Gaps for an ERP + component library
- No `components/` (or `src/`) structure.
- No shared UI primitives (Button, Input, Table, etc.).
- No layout shell (sidebar, header, nav).
- No forms library or table/data-grid library chosen.
- No conventions for ERP domains (e.g. inventory, orders, customers).

---

## 2. Proposed Folder Structure (Preparation Only)

Suggested layout **before** coding, so we know where everything will live:

```
erpmvp/
├── app/                          # Next.js App Router (keep)
│   ├── (auth)/                   # Optional: login, forgot password
│   ├── (dashboard)/              # Main ERP shell (sidebar + content)
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── products/
│   │   └── ...
│   ├── layout.tsx
│   ├── page.tsx                  # Landing or redirect
│   └── globals.css
│
├── components/                   # Reusable UI (design system)
│   ├── ui/                       # Primitives (buttons, inputs, tables, etc.)
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Table/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   ├── Tabs/
│   │   ├── Dropdown/
│   │   └── ...
│   ├── layout/                   # App shell
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── PageContainer/
│   │   └── ...
│   └── shared/                   # Domain-agnostic composed pieces
│       └── DataTable/            # Table + pagination + search
│
├── lib/                          # Utilities, hooks, API helpers
│   ├── utils.ts                  # cn(), formatters, etc.
│   └── api/                      # API client, endpoints (when needed)
│
├── types/                        # Shared TypeScript types
│   └── index.ts
│
├── hooks/                        # Shared React hooks (optional top-level)
│
└── docs/                         # This file and future specs
    └── ERP_PREPARATION.md
```

Use `@/components`, `@/lib`, `@/types`, `@/hooks` with the existing `@/*` path alias.

---

## 3. Reusable Components Checklist (To Build Later)

### 3.1 Primitives (`components/ui/`)
- **Button** — primary, secondary, ghost, danger; sizes (sm/md/lg); disabled; loading.
- **Input** — text, number, email; label, error, hint; optional prefix/suffix.
- **Select** — single/multi; searchable if needed; same label/error pattern.
- **Checkbox / Radio** — label, disabled, indeterminate (checkbox).
- **Textarea** — resize options, max length, label/error.
- **Table** — `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableCell>`; sticky header optional.
- **Card** — container with optional title, actions, footer.
- **Badge** — status/success/warning/error; dot variant.
- **Tabs** — horizontal (and optionally vertical) for section switching.
- **Modal / Dialog** — open/close, title, footer (actions), accessibility (focus trap, escape).
- **Dropdown / Menu** — trigger + list of actions/links.
- **Toast / Notifications** — success/error/info (decide provider later).
- **Skeleton** — loading placeholders for tables and cards.
- **Pagination** — page numbers + prev/next; total count / page size if needed.

### 3.2 Layout (`components/layout/`)
- **Sidebar** — collapsible; nav items; active state.
- **Header** — logo, breadcrumb or title, user menu, theme toggle (if added).
- **PageContainer** — max-width, padding, optional title + actions bar.

### 3.3 Composed / Shared
- **DataTable** — Table + filters + sort + pagination + optional row actions (reusable across ERP modules).
- **FormField** — label + error + hint wrapper around Input/Select/Textarea/Checkbox.
- **EmptyState** — icon + message + optional CTA for empty lists.
- **ConfirmDialog** — Modal with confirm/cancel for destructive actions.

---

## 4. Design System Conventions (To Extend)

- **Extend `globals.css`** with semantic tokens (e.g. `--primary`, `--muted`, `--border`, `--destructive`, spacing scale) so all components use the same palette and spacing.
- **One component per folder** when it has multiple files (e.g. `Button/Button.tsx`, `Button/index.ts`, `Button/Button.test.tsx`); single-file components can live as `Button.tsx` + `index.ts` if preferred.
- **Props**: use TypeScript interfaces; support `className` and `...rest` for layout and overrides.
- **Variants**: prefer a single `variant` (and optionally `size`) prop with a small fixed set of values (e.g. `variant="primary" | "secondary" | "ghost"`).
- **Accessibility**: focus states, ARIA where needed (modals, dropdowns), keyboard nav for lists/menus.

---

## 5. ERP-Specific Considerations (Preparation Only)

- **Modules to plan for**: Dashboard, Inventory, Orders, Customers, Products, Suppliers, Reports, Settings. Start with a subset (e.g. Dashboard, Products, Orders).
- **Data patterns**: Lists with filters, sort, pagination; create/edit forms; detail views; simple master–detail where relevant.
- **Tables**: Central to ERP; invest in one solid **DataTable** (or table wrapper) used everywhere.
- **Forms**: Many entities (product, order, customer); reusable **FormField** + primitives (Input, Select, etc.) will pay off.
- **API**: Decide later whether to use Next.js route handlers, external REST, or tRPC; keep API calls in `lib/api` or similar so UI stays decoupled.

---

## 6. Suggested Order of Work (When You Start Coding)

1. **Design tokens** — Extend `globals.css` (and Tailwind theme) with a small set of semantic colors and spacing.
2. **Utils** — Add `lib/utils.ts` (e.g. `cn()` for class names) if you don’t add a small utility lib.
3. **Primitives** — Button, Input, Card, Table, then Select, Tabs, Modal, Badge, etc.
4. **Layout** — Sidebar + Header + PageContainer; then dashboard layout and first dashboard page.
5. **DataTable + FormField** — Build once, reuse across modules.
6. **First ERP module** — e.g. Products or Orders: list page (DataTable) + simple create/edit form.

---

## 7. Summary

| Item | Status |
|------|--------|
| Stack understood | Next 16, React 19, Tailwind 4, TS |
| Path alias | `@/*` ready |
| Folder structure | Proposed in §2 |
| Reusable components list | Listed in §3 (buttons, tables, inputs, etc.) |
| Design system approach | Extend CSS vars + Tailwind; one variant/size pattern |
| ERP scope | High-level modules and data patterns noted |
| Next step | When ready: tokens → utils → Button/Input/Card/Table → layout → DataTable → first module |

No code has been written; this document is the preparation for the ERP and reusable component work.
