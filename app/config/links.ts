// 你們有跟其他社團或活動交流的話可以在這邊加上他們的介紹
// 不會改問GPT

export const links: Links[] = [
  {
    name: "中一中電研社", // 連結名稱
    image: "https://tcirc.tw/images/apple-touch-icon.png", // 對方的圖示
    description: "臺中一中電腦資訊研習社", // 他們的介紹
    slug: "tcirc", // hashtag，就是＠xxx那個

    // 社團類型
    //  你們有以下幾種可以選
    //  也可以自己去改程式自己加
    // - club是社團
    // - personal是個人，
    //   社員或者哪個個人，是人就可以
    //   但要跟我們社團有關係
    // - organization是組織
    //   例如中電會那種
    //   反正如果你們有去加那種東西你們就知道了
    // - activity是活動
    //   我相信你們活動肯定會
    //   開一個新的IG帳號什麼的宣傳對吧
    tag: "club",

    // 他們的連結
    links: [
      {
        // 類型
        //  有以下幾種可以選，一樣可以自己加
        //   - website：網站
        //   - link-in-bio：連結頁面，Linktree那種的
        //   - github、facebook、instagram、threads、discord，就對應的東西不用問吧
        type: "website",
        url: "https://tcirc.tw/", // 連結，https或http要有
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
    // HEX色碼格式的顏色
    // 通常是選他們的主題色比較好看
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

// 親愛的學弟底下別亂動，出事了我可不保證你們聯絡的到我

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
