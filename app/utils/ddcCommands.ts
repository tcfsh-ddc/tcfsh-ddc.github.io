import type { TerminalCommand, TerminalContext } from "@/types/terminal";

const OFFICERS = [
  { title: "社長", name: "野蘑菇" },
  { title: "副社長", name: "SamHacker" },
  { title: "公關", name: "何禹寬" },
  { title: "美宣", name: "陳柏安" },
  { title: "遊戲", name: "王譯淳、龎沅濬" },
  { title: "音樂", name: "林子靖" },
];

export const ddcCommands: TerminalCommand[] = [
  {
    name: "member",
    description: "顯示社幹",
    onCalled: (c: TerminalContext) => {
      // 將OFFICERS轉換成TerminalSegment

      c.print(
        OFFICERS.flatMap(({ title, name }) => [
          { color: "--color-purple", content: title + ": " },
          { color: "inherit", content: "    " },
          { color: "--color-blue", content: name },
          { color: "inherit", content: "\n" },
        ]),
      );
    },
  },
];
