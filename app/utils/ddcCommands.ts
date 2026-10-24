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
  {
    name: "info",
    description: "介紹我們社團",
    onCalled: (c: TerminalContext) => {
      c.print([
        {
          color: "inherit",
          content:
            "\n歡迎來到數創！\n\
一中數創社是一個熱鬧的大家庭。在這裡你可以用雙手把腦海的想像化為現實、或在Unity中造出你的一方天地，甚至使用FL Studio來製作你所喜愛的音樂。\
一切盡在數創，只要你願意加入\n\n",
        },
      ]);
    },
  },
  {
    name: "designer",
    description: "介紹這個網頁的作者",
    onCalled: (c: TerminalContext) => {
      c.print([
        {
          color: "inherit",
          content: "\n這網站是由數創第二十一屆的副社長",
        },
        { color: "--color-lime", content: " SamHacker " },
        {
          color: "inherit",
          content: "所製作的\n\n",
        },
      ]);
    },
  },
];
