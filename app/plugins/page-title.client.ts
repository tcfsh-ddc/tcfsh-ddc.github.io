export default defineNuxtPlugin(() => {
  const originalTitle = document.title;

  let typingTimer: ReturnType<typeof setTimeout> | null = null;
  let restoreTimer: ReturnType<typeof setTimeout> | null = null;

  // 初始載入打字機效果
  const typewriterTitle = (text: string, speed = 200) => {
    let index = 0;
    document.title = "";

    const type = () => {
      if (index < text.length) {
        document.title += text[index];
        index++;

        typingTimer = setTimeout(type, speed);
      } else {
        typingTimer = null;

        // 打字完成後才啟用監聽
        document.addEventListener("visibilitychange", handleVisibilityChange);
      }
    };

    type();
  };

  // 離開與返回時直接切換標題
  function handleVisibilityChange() {
    clearTimeout(restoreTimer!);

    if (document.hidden) {
      document.title = "(〒︿〒) 你要離開了嗎？";
    } else {
      document.title = "d(`･∀･)b 歡迎回來！";

      restoreTimer = setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    }
  }

  typewriterTitle(originalTitle, 100);
});
