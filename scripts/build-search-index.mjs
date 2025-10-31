import { promises as fs } from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('./');
const guidesDir = path.join(rootDir, 'guides');
const dataDir = path.join(rootDir, 'data');
const outputFile = path.join(dataDir, 'search.json');

async function readGuideFiles() {
  const entries = await fs.readdir(guidesDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function extractTitle(contents) {
  const titleMatch = contents.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch) {
    return 'Untitled';
  }
  const raw = titleMatch[1].trim();
  const separatorIndex = raw.indexOf('|');
  if (separatorIndex === -1) {
    return raw;
  }
  return raw.slice(0, separatorIndex).trim();
}

function extractDescription(contents) {
  const descriptionMatch = contents.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return descriptionMatch ? descriptionMatch[1].trim() : '';
}

function extractSections(contents) {
  const sections = [];
  const headingRegex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let match;
  while (sections.length < 4 && (match = headingRegex.exec(contents))) {
    const text = match[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&rarr;/gi, '→')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) {
      sections.push(text);
    }
  }
  return sections;
}

async function buildIndex() {
  const files = await readGuideFiles();
  const records = [];

  for (const file of files) {
    const filePath = path.join(guidesDir, file);
    const contents = await fs.readFile(filePath, 'utf8');

    records.push({
      title: extractTitle(contents),
      url: `guides/${file}`,
      abstract: extractDescription(contents),
      sections: extractSections(contents),
    });
  }

  return records;
}

async function main() {
  const index = await buildIndex();
  const pretty = `${JSON.stringify(index, null, 2)}\n`;
  await fs.writeFile(outputFile, pretty, 'utf8');
  console.log(`search.json rebuilt with ${index.length} entries.`);
}

main().catch((error) => {
  console.error('Failed to build search index', error);
  process.exitCode = 1;
});
