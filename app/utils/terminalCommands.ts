import type { TerminalCommand, TerminalContext } from "@/types/terminal";

type FileEntry = {
  type: "file" | "directory";
  content?: string;
};

const fileSystem: Record<string, FileEntry> = {
  "~": { type: "directory" },
  "~/Documents": { type: "directory" },
  "~/Downloads": { type: "directory" },
  "~/README.txt": {
    type: "file",
    content: "Welcome to the simulated Linux terminal!",
  },
};

let currentDirectory = "~";

function normalizePath(path: string): string {
  if (!path || path === "~") {
    return "~";
  }

  if (path.startsWith("/")) {
    return path.replace(/\/+$/, "") || "/";
  }

  const base =
    currentDirectory === "~"
      ? ""
      : currentDirectory === "/"
        ? ""
        : currentDirectory.replace(/^~/, "");

  const parts = `${base}/${path}`.split("/").filter(Boolean);

  const normalized: string[] = [];

  for (const part of parts) {
    if (part === ".") continue;

    if (part === "..") {
      normalized.pop();
    } else {
      normalized.push(part);
    }
  }

  return normalized.length ? `~/${normalized.join("/")}` : "~";
}

function printText(c: TerminalContext, content: string): void {
  c.print([{ color: "inherit", content }]);
}

export const terminalCommands: TerminalCommand[] = [
  {
    name: "help",
    description: "顯示可用的指令",
    onCalled(c) {
      c.print([{ color: "#9EA93F", content: "可用指令：" }]);

      for (const command of terminalCommands) {
        c.print([
          { color: "#00B800", content: command.name.padEnd(12) },
          { color: "inherit", content: command.description },
        ]);
      }
    },
  },
  {
    name: "pwd",
    description: "顯示目前所在目錄",
    onCalled(c) {
      printText(c, currentDirectory);
    },
  },
  {
    name: "ls",
    description: "列出目錄中的檔案",
    onCalled(c, args) {
      const target = normalizePath(args[0] ?? ".");

      const entries = Object.keys(fileSystem).filter((path) => {
        if (target === "~") {
          return path.startsWith("~/") && !path.slice(2).includes("/");
        }

        return (
          path.startsWith(`${target}/`) &&
          !path.slice(target.length + 1).includes("/")
        );
      });

      if (!entries.length) {
        printText(c, "");
        return;
      }

      c.print(
        entries.flatMap((path, index) => {
          const name = path.split("/").pop() ?? path;
          const entry = fileSystem[path];

          return [
            {
              color: entry?.type === "directory" ? "#6CB6FF" : "inherit",
              content: `${index ? "  " : ""}${name}`,
            },
          ];
        }),
      );
    },
  },
  {
    name: "cd",
    description: "切換目錄",
    onCalled(c, args) {
      const target = normalizePath(args[0] ?? "~");
      const entry = fileSystem[target];

      if (target === "~" || entry?.type === "directory") {
        currentDirectory = target;
        return;
      }

      printText(c, `cd: 找不到目錄：${args[0]}`);
    },
  },
  {
    name: "mkdir",
    description: "建立目錄",
    onCalled(c, args) {
      if (!args[0]) {
        printText(c, "mkdir: 請指定目錄名稱");
        return;
      }

      const path = normalizePath(args[0]);

      if (fileSystem[path]) {
        printText(c, `mkdir: ${args[0]} 已存在`);
        return;
      }

      fileSystem[path] = { type: "directory" };
    },
  },
  {
    name: "touch",
    description: "建立空白檔案",
    onCalled(c, args) {
      if (!args[0]) {
        printText(c, "touch: 請指定檔案名稱");
        return;
      }

      const path = normalizePath(args[0]);

      if (fileSystem[path]?.type === "directory") {
        printText(c, `touch: ${args[0]} 是目錄`);
        return;
      }

      fileSystem[path] ??= {
        type: "file",
        content: "",
      };
    },
  },
  {
    name: "cat",
    description: "顯示檔案內容",
    onCalled(c, args) {
      const path = normalizePath(args[0] ?? "");
      const entry = fileSystem[path];

      if (!entry || entry.type !== "file") {
        printText(c, `cat: 找不到檔案：${args[0] ?? ""}`);
        return;
      }

      printText(c, entry.content ?? "");
    },
  },
  {
    name: "echo",
    description: "輸出文字",
    onCalled(c, args) {
      printText(c, args.join(" "));
    },
  },
  {
    name: "whoami",
    description: "顯示目前使用者",
    onCalled(c) {
      printText(c, "guest");
    },
  },
  {
    name: "uname",
    description: "顯示系統資訊",
    onCalled(c, args) {
      printText(
        c,
        args.includes("-a")
          ? "Linux localhost 6.8.0-generic x86_64 GNU/Linux"
          : "Linux",
      );
    },
  },
  {
    name: "date",
    description: "顯示目前日期與時間",
    onCalled(c) {
      printText(c, new Date().toString());
    },
  },
  {
    name: "rm",
    description: "刪除檔案",
    onCalled(c, args) {
      if (!args[0]) {
        printText(c, "rm: 請指定檔案名稱");
        return;
      }

      const path = normalizePath(args[0]);
      const entry = fileSystem[path];

      if (!entry) {
        printText(c, `rm: 找不到檔案：${args[0]}`);
        return;
      }

      if (entry.type === "directory") {
        printText(c, `rm: ${args[0]} 是目錄，無法直接刪除`);
        return;
      }

      delete fileSystem[path];
    },
  },
  {
    name: "clear",
    description: "清除終端機畫面",
    onCalled(c) {
      c.clear();
    },
  },
];
