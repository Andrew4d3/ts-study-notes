import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, basename } from "path";
import LZString from "lz-string";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PLAYGROUND_BASE = "https://www.typescriptlang.org/play/?#code/";

function playgroundUrl(code) {
  return PLAYGROUND_BASE + LZString.compressToEncodedURIComponent(code);
}

function csvField(value) {
  return `"${value.replace(/"/g, '""')}"`;
}

function parseSections(markdown) {
  const sections = [];
  const blocks = markdown.split(/^## /m).slice(1); // drop content before first ##

  for (const block of blocks) {
    const codeMatch = block.match(/```ts\n([\s\S]*?)```/);
    const explanationMatch = block.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?:\n---|\n##|$)/);

    if (!codeMatch || !explanationMatch) continue;

    sections.push({
      code: codeMatch[1].trimEnd(),
      explanation: explanationMatch[1].trim(),
    });
  }

  return sections;
}

const inputArg = process.argv[2];
if (!inputArg) {
  console.error("Usage: node scripts/generate-anki.mjs <path-to-markdown>");
  process.exit(1);
}

const inputPath = resolve(process.cwd(), inputArg);
const markdown = readFileSync(inputPath, "utf8");
const sections = parseSections(markdown);

const rows = sections.map(({ code, explanation }) => {
  const url = playgroundUrl(code);
  const front = `Explain this:<br><a href="${url}">TS Playground</a>`;
  return `${csvField(front)},${csvField(explanation)}`;
});

const output = rows.join("\n") + "\n";
const outPath = resolve(ROOT, basename(inputPath, ".md") + ".csv");
writeFileSync(outPath, output, "utf8");

console.log(`Generated ${rows.length} card(s) → ${outPath}`);
