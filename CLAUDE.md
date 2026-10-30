# CLAUDE.md

Client project: RPM Funding landing page. Independent from the SellAgent repos.

- Stack: React + Vite, plain CSS (no Tailwind, no CSS-in-JS).
- Prefix every CSS class with a unique component root (e.g. `rpm-hero`, `rpm-hero-title`). No inline styles except data-driven values.
- Brand colors, fonts and logo come from RPM Funding, not SellAgent. Define them as CSS variables in `src/index.css`.
- No em dashes in visible copy.
- Keep files under 1000 lines. Keep one component per file: `src/components/Name/Name.jsx` and `Name.css`.
