/**
 * 網站共用設定。下一屆主要只需要修改這個檔案，就能更新網站名稱、介紹與社群資訊。
 */
const sessionNum = 21; // 你是第幾屆

export const siteConfig: SiteConfigType = {
  // 社團名稱
  name: "中一中數位創作研究社",
  // 簡稱
  shortName: "數位創作研究社",
  // 網站標題的後綴
  // 例如：
  // 首頁 - 中一中數位創作研究社
  //        ^^^^^^^^^^^^^^^^^^^^
  //                這串
  titleSuffix: "中一中數位創作研究社",

  // 這個不用動，他是屆次，動最上面const就好
  sessionNum,
  sessionNumChinese: numToChinese(sessionNum),

  // 網站介紹
  description:
    "嗨！歡迎來到數創的大家庭。如果你也對打造自己的作品有興趣，那就在這裡了解我們更多吧。",

  // 關於頁面的介紹
  aboutDescription: "對，關於我們的介紹，我們是什麼？我們是什麼？我們是數創！",

  // 社團Logo，會顯示在分頁左邊ㄉ那個小圖示
  logo: {
    src: "/ddc-logo.jpg", // 路徑，不會的話別改，去public資料夾換掉這個檔案就好
    alt: "數位創作研究社 Logo", // 文字說明，不會的話別改沒關係
  },
  sourceUrl: "https://github.com/tcfsh-ddc/tcfsh-ddc.github.io", // 原始碼儲存庫，我忘記給你權限的話叫我一下
} as const satisfies SiteConfigType;

// ===> 底下不用動 真的不要動

interface SiteConfigType {
  name: string;
  shortName: string;
  titleSuffix: string;
  sessionNum: number;
  sessionNumChinese: string;
  description: string;
  aboutDescription: string;
  logo: {
    src: string;
    alt: string;
  };
  sourceUrl: string;
}

function numToChinese(num: number) {
  const chnNumChar = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  const chnUnitSection = ["", "萬", "億", "兆"];
  const chnUnitChar = ["", "十", "百", "千"];

  // 將整數區段轉成中文
  function SectionToChinese(section: number) {
    let strIns = "";
    let chnStr = "";
    let unitPos = 0;
    let zero = true;
    while (section > 0) {
      let v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v] as string;
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  }

  if (num === 0) return "零";

  let numStr = num.toString();
  let chnStr = "";
  let unitPos = 0;
  let needZero = false;

  while (num > 0) {
    let section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    let str = SectionToChinese(section);
    let extra = section !== 0 ? chnUnitSection[unitPos] : "";
    chnStr = str + extra + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}

export function pageTitle(title: string) {
  return `${title} - ${siteConfig.titleSuffix}`;
}
