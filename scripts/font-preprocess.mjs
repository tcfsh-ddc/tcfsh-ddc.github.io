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
const args = process.argv.slice(2);
const presetIndex = args.indexOf("--preset");
const preset =
  presetIndex === -1 ? process.env.NUXT_PRESET : args[presetIndex + 1];
const githubPages = preset === "github_pages";
const publicDir = path.join(root, githubPages ? ".output/public" : "dist");
const outputDir = githubPages
  ? path.join(publicDir, "_nuxt", "fonts")
  : path.join(publicDir, "fonts");
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
  await readdir(publicDir);
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
  let fontFiles;

  if (githubPages) {
    const fontDir = path.join(publicDir, "_nuxt", "fonts");
    const cssFiles = await collectFiles(publicDir, new Set([".css"]));
    const fontNames = (await readdir(fontDir)).filter((file) =>
      file.toLowerCase().endsWith(".ttf"),
    );

    const cssEntries = await Promise.all(
      cssFiles.map(async (file) => ({
        file,
        content: await readFile(file, "utf8"),
      })),
    );

    fontFiles = weights.map((weight) => {
      const matches = new Set();

      for (const { file: cssFile, content } of cssEntries) {
        for (const [rule] of content.matchAll(/@font-face\s*\{[^}]*\}/g)) {
          if (
            !/font-family:\s*["']?GlowSans["']?/i.test(rule) ||
            !new RegExp(`font-weight:\\s*${weight}(?:\\D|$)`).test(rule)
          ) {
            continue;
          }

          const url = rule.match(/url\(["']?([^"')]+)/)?.[1];

          if (!url || /^(?:data:|https?:)/i.test(url)) {
            continue;
          }

          const resolved = path.resolve(
            path.dirname(cssFile),
            decodeURIComponent(url.split("?")[0].split("#")[0]),
          );

          if (path.dirname(resolved) === fontDir) {
            const name = path.basename(resolved);

            if (fontNames.includes(name)) {
              matches.add(resolved);
            }
          }
        }
      }

      if (matches.size !== 1) {
        throw new Error(
          `Expected exactly one GlowSans ${weight} font in ${fontDir}, found ${matches.size}: ${[...matches].join(", ")}`,
        );
      }

      return {
        weight,
        file: [...matches][0],
      };
    });
  } else {
    fontFiles = weights.map((weight) => ({
      weight,
      file: path.join(outputDir, `GlowSans-${weight}.ttf`),
    }));
  }

  await mkdir(sourceDir, { recursive: true });
  const faces = fontFiles.map(({ weight, file }) => {
    const fileName = `GlowSans-${weight}${path.extname(file)}`;
    return `@font-face { font-family: "GlowSans"; font-style: normal; font-weight: ${weight}; src: url("fonts/${fileName}") format("${path.extname(file) === ".otf" ? "opentype" : "truetype"}"); }`;
  });

  for (const { weight, file } of fontFiles) {
    const fileName = `GlowSans-${weight}${path.extname(file)}`;
    await copyFile(file, path.join(sourceDir, fileName));
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

  for (const { weight, file } of fontFiles) {
    const fileName = `GlowSans-${weight}${path.extname(file)}`;
    await writeFile(file, await readFile(path.join(sourceDir, fileName)));
  }
  console.info(
    `Font preprocessing complete: ${text.size} unique characters scanned.`,
  );
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
