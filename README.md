# ts-study-notes
This project contains easy to remember study notes for Typescript syntax and concepts, presented as a documentation site powered by [Docsify](https://docsify.js.org). Notes are organized by topic and written in Markdown under the `docs/` folder. The site requires no build step — Docsify renders everything client-side at runtime.

## Running the docs site

```bash
npm install
npm run serve
# open http://localhost:3000
```

To deploy, point GitHub Pages at the `docs/` folder on the `main` branch, or run `npm run build` to copy `docs/` into a `dist/` folder for Netlify/Vercel.

## Generating Anki flashcards

The `generate-anki` script reads a markdown notes file and produces an `anki-export.csv` ready to import into Anki.

Each card is generated from a section that contains a `ts` code block and an `**Explanation:**` paragraph. The front of the card links to the TypeScript Playground pre-loaded with the code snippet; the back contains the explanation text.

```bash
npm run generate-anki -- <path-to-markdown>
```

**Example:**

```bash
npm run generate-anki -- docs/types.md
```

This creates `anki-export.csv` in the project root.

**Importing into Anki:**

1. Open Anki → File → Import
2. Select `anki-export.csv`
3. Set separator to **Comma**
4. Map Field 1 → Front, Field 2 → Back
