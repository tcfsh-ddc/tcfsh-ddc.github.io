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
    content: "恭喜你找到了，不過這裡沒東西www",
  },
};

async function simulateSystemDestruction(c: TerminalContext): Promise<void> {
  const terminal = document.querySelector<HTMLElement>(".terminal");

  if (!terminal) {
    printText(c, "sudo: 無法初始化系統毀滅程序。");
    return;
  }

  const delay = (ms = 1) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  await delay(2000);

  const overlay = document.createElement("div");
  overlay.className = "system-destruction-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const log = document.createElement("pre");
  log.className = "system-destruction-log";

  overlay.append(log);
  document.body.append(overlay);

  terminal.classList.add("terminal--destroyed");

  const messages = [
    "[sudo] authenticating root privileges...",
    "[OK] Root access granted.",
    "rm: initiating recursive filesystem removal",
    "rm: removing /boot",
    "rm: removing /etc",
    "rm: removing /usr",
    "rm: removing /var",
    "rm: removing /home",
    "rm: removing /bin",
    "rm: removing /sbin",
    "rm: removing /lib",
    "rm: removing /dev",
    "rm: removing /proc",
    "rm: removing /sys",
    "kernel: critical system files are missing",
    "kernel: unable to locate essential binaries",
    "init: failed to start system services",
    "systemd[1]: dependency failed",
    "systemd[1]: emergency.target: FAILED",
    "kernel panic - not syncing: Attempted to kill init!",
    "Please reboot your system.",
    "",
    "SYSTEM FAILURE",
    "ALL SYSTEMS OFFLINE",
    "CONNECTION TO REALITY LOST",
  ];

  try {
    for (const message of messages) {
      log.textContent += `${message}\n`;

      overlay.scrollTop = overlay.scrollHeight;

      await delay(1);
    }

    await delay(500);

    const horrorMessages = [
      "Wait...",
      "Something is still running.",
      "Why is the terminal still alive?",
      "I thought everything was deleted.",
      "",
      "YOU SHOULD NOT HAVE DONE THAT.",
      "",
      "SYSTEM STATE: UNKNOWN",
      "YAJYUU SENPAI WAS LOGINEA9V75x5mp7tFd4i9",
      "Look for your back, oh no, never do i3CuYxzdHdkaPesFE",
      "SSB0aGluayBtYXliZSB0aGlzIGlzIG5vdCBhIGdvb2QgaWRlYS4uLi4uLg==",
      "5Y+w5Lit5LiA5Lit6Zec5b+D5oKo",
    ];

    for (const message of horrorMessages) {
      log.textContent += `${message}\n`;
      overlay.scrollTop = overlay.scrollHeight;

      await delay(250);
    }

    await delay(500);

    c.print([
      {
        color: "#ff3333",
        content: "FATAL ERROR: SYSTEM DESTROYED",
      },
    ]);

    c.print([
      {
        color: "#b7ffb7",
        content: "terminal://still_alive",
      },
    ]);

    console.log(
      "%c 願有緣，像素塔中再見",
      "background: red; color: black; font-size: 16px; border-radius: 4px;",
    );

    alert(
      "你似乎也意識到了這件事。\
旅船是掩蓋未來的虛像，戰車正指引著我們的命運。\
硬幣擲出以後，正逆的轉換從未停止。\
前方是毀滅亦是重生。",
    );

    await delay(200);

    c.clear();
  } catch {
    log.textContent += "\n[simulation interrupted]\n";
  }
}

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

      if (args[0] == "-rf" && args[1] == "/") {
        printText(
          c,
          "rm: fatal: 基於良心，我個人建議你最好仔細思考一下，然後還有你權限不夠給我去提權......",
        );
      }

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
  {
    name: "sudo",
    description: "其實這裡面只有某些東西你可以用，請自行發掘或看原始碼",
    async onCalled(c, args) {
      const isDangerousCommand =
        args[0] === "rm" &&
        args[1] === "-rf" &&
        args[2] === "/" &&
        args[3] === "--no-preserve-root";

      if (isDangerousCommand) {
        await simulateSystemDestruction(c);
        return;
      }

      if (args[0] === "rm" && args[1] === "-rf" && args[2] === "/") {
        printText(c, "sudo: 這個指令對系統有嚴重危害性。");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        c.print([
          {
            color: "--color-purple",
            content: "sudo: 你真的知道自己在做什麼嗎？",
          },
        ]);

        return;
      }

      printText(c, `sudo: 找不到指令 ${args[0] ?? ""}`);
    },
  },
];
