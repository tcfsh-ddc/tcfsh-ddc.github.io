import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

export const base64Loader: Plugin = {
  name: "base64-loader",
  transform(_: any, id: string) {
    const [filePath, query] = id.split("?");
    if (query !== "base64") return null;

    const data = fs.readFileSync(filePath);
    const base64 = data.toString("base64");

    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "application/octet-stream";

    if (ext === ".png") {
      mimeType = "image/png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      mimeType = "image/jpeg";
    } else if (ext === ".svg") {
      mimeType = "image/svg+xml";
    } else if (ext === ".gif") {
      mimeType = "image/gif";
    } else if (ext === ".webp") {
      mimeType = "image/webp";
    } else if (ext === ".woff") {
      mimeType = "font/woff";
    } else if (ext === ".woff2") {
      mimeType = "font/woff2";
    }

    return `export default 'data:${mimeType};base64,${base64}';`;
  },
};
