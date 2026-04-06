# TypeScript Study Notes

A personal reference site for TypeScript syntax, patterns, and concepts — organized for quick lookup and incremental learning.

## Topics

- [Types](types.md)

## How to Run Locally

```bash
npm install
npm run serve
# open http://localhost:3000
```

## How to Deploy

The `docs/` folder is the deployable artifact — no build step is needed.

- **GitHub Pages**: Point GitHub Pages at the `docs/` folder on the `main` branch.
- **Netlify / Vercel**: Run `npm run build` to copy `docs/` into `dist/`, then set the publish directory to `dist/`.
