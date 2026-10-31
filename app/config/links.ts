export interface LinkList {
  type:
    | "website" // 社網
    | "link-in-bio" // 連結列表
    | "github"
    | "facebook"
    | "instagram"
    | "threads"
    | "discord";
  url: string;
}

export interface Links {
  name: string;
  image: string;
  description: string;
  slug: string;
  tag:
    | "club" // 友社
    | "personal" // 個人
    | "organization" // 聯合組織的數據
    | "activity"; // 活動官方帳號
  links: LinkList[];
  color: string; // 顏色（CSS色碼或關鍵字等）
}

// 親愛的接手這網站的學弟，友善告訴你
// 如果你不會寫前端的話上面別動，出事了別找我QAQ

export const links: Links[] = [
  {
    name: "中一中電研社",
    image: "https://tcirc.tw/images/apple-touch-icon.png",
    description: "臺中一中電腦資訊研習社",
    slug: "tcirc",
    tag: "club",
    links: [
      {
        type: "website",
        url: "https://tcirc.tw/",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/tcirc_42nd",
      },
      {
        type: "github",
        url: "https://github.com/tcirc",
      },
    ],
    color: "#12233F",
  },
  {
    name: "中部電資社團聯合會議",
    image: "https://scaict.org/src/img/logo.svg",
    description:
      "成立於2021年，由一群熱愛資訊科技和社團活動的高中職生所組成，希望整合中部資訊科技資源，推廣資訊課程。",
    slug: "scaict",
    tag: "organization",
    links: [{ type: "website", url: "https://scaict.org/" }],
    color: "#000000",
  },
  {
    name: "SamHacker",
    image:
      "https://gravatar.com/avatar/f7598bd8d4aba38d7219341f81a162fc842376b3b556b1995cbb97271d9e2915",
    description: "嗨你好我個人認為義大利麵應該拌四十二號混凝土",
    slug: "samhacker",
    tag: "personal",
    links: [
      {
        type: "website",
        url: "https://samhacker.xyz",
      },
      {
        type: "link-in-bio",
        url: "https://lib.samhacker.xyz",
      },
      {
        type: "threads",
        url: "https://www.threads.net/@samhacker.xyz",
      },
    ],
    color: "#FFFFFF",
  },
];
