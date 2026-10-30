# RPM Funding Landing Page

Landing page for the client RPM Funding. This repo is separate from the SellAgent monorepo and must stay that way: no SellAgent code, keys, or assets here.

## Stack
React + Vite, plain CSS.

## Commands
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Notes
- Secrets go in `.env` (git-ignored). Never reuse SellAgent keys.
- Deploy as its own project on the hosting provider, with its own domain.
