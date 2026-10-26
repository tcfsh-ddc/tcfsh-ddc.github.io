import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fontSpider from "font-spider";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist");
const outputDir = path.join(publicDir, "fonts");
const tempDir = await mkdtemp(path.join(root, ".font-preprocess-"));
const sourceDir = path.join(tempDir, "fonts");

async function collectFiles(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const file = path.join(dir, entry.name);
      return entry.isDirectory() ? collectFiles(file, extensions) : [file];
    }),
  );
  return files
    .flat()
    .filter((file) => extensions.has(path.extname(file).toLowerCase()));
}

try {
  const staticFiles = await collectFiles(
    publicDir,
    new Set([".html", ".js", ".css"]),
  );
  const sourceFiles = await collectFiles(
    path.join(root, "app"),
    new Set([".vue", ".ts", ".js", ".md", ".css"]),
  );
  const text = new Set();

  for (const file of [...staticFiles, ...sourceFiles]) {
    const content = await readFile(file, "utf8");
    for (const char of content) {
      if (!/\s/u.test(char)) text.add(char);
    }
  }

  const weights = [200, 400, 700];
  await mkdir(sourceDir, { recursive: true });
  const faces = weights.map((weight) => {
    const fileName = `GlowSans-${weight}.ttf`;
    return `@font-face { font-family: "GlowSans"; font-style: normal; font-weight: ${weight}; src: url("fonts/${fileName}") format("truetype"); }`;
  });

  for (const weight of weights) {
    const fileName = `GlowSans-${weight}.ttf`;
    await copyFile(
      path.join(outputDir, fileName),
      path.join(sourceDir, fileName),
    );
  }

  await mkdir(tempDir, { recursive: true });
  await writeFile(
    path.join(tempDir, "font-scan.css"),
    faces.join("\n"),
    "utf8",
  );
  await writeFile(
    path.join(tempDir, "font-scan.html"),
    `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="font-scan.css"></head><body><p style="font-family: GlowSans">${[...text].join("")}</p></body></html>`,
    "utf8",
  );

  const webFonts = await fontSpider.spider(
    [path.join(tempDir, "font-scan.html")],
    { silent: false },
  );
  await fontSpider.compressor(webFonts, { backup: false });

  for (const weight of weights) {
    const fileName = `GlowSans-${weight}.ttf`;
    await writeFile(
      path.join(outputDir, fileName),
      await readFile(path.join(sourceDir, fileName)),
    );
  }
  console.info(
    `Font preprocessing complete: ${text.size} unique characters scanned.`,
  );
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
