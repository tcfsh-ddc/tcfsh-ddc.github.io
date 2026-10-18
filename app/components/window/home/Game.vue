<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="game-window @container"
    :initial-x="292"
    :initial-y="80"
    :initial-width="531"
    :initial-height="380"
    :min-width="340"
    :min-height="260"
  >
    <template #titlebar>
      <div class="grid w-full min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-3 pr-14">
        <div
          class="hidden min-w-0 items-center gap-2 font-extralight text-black-200 @lg:flex"
          aria-label="編輯器選單"
        >
          <span v-for="item in menuItems" :key="item">{{ item }}</span>
        </div>
        <p class="truncate text-base font-extralight text-black-50">遊戲組.cs - Chaos</p>
        <div class="hidden justify-self-end overflow-hidden rounded bg-black-900 @md:flex">
          <span
            class="grid size-5 place-items-center rounded-sm bg-blue-dark text-base font-bold text-white"
            >P</span
          >
          <span class="px-1.5 py-0.5 text-sm text-white">project-beebo</span>
        </div>
      </div>
    </template>

    <TabsRoot
      default-value="code"
      activation-mode="automatic"
      class="flex min-h-0 min-w-0 flex-1 flex-col gap-2"
    >
      <div class="flex shrink-0 items-center justify-between gap-3">
        <div
          class="flex items-center gap-2.5 rounded bg-black-800 p-1 text-black-50"
          aria-label="編輯器工具列"
        >
          <button
            v-for="tool in tools"
            :key="tool.label"
            type="button"
            class="grid size-[18px] place-items-center rounded-sm transition-colors hover:bg-black-700"
            :aria-label="tool.label"
            :title="tool.label"
          >
            <component :is="tool.icon" :size="18" weight="thin" />
          </button>
        </div>

        <TabsList class="flex min-w-0 items-center gap-2.5 overflow-x-auto" aria-label="介紹檔案">
          <TabsTrigger value="code" :class="tabClass">introduction.cs</TabsTrigger>
          <TabsTrigger value="markdown" :class="tabClass">introduction.md</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="code"
        class="min-h-0 min-w-0 flex-1 overflow-auto text-xs font-extralight leading-[17px] text-white outline-none"
        aria-label="遊戲組介紹程式碼"
      >
        <div class="grid w-max min-w-full grid-cols-[auto_1fr] gap-2.5">
          <ol class="select-none text-right text-black-400" aria-hidden="true">
            <li v-for="(_, index) in codeLines" :key="index">{{ index + 1 }}</li>
          </ol>
          <pre
            class="m-0 whitespace-pre font-inherit leading-[17px]"
          ><code v-if="highlightedCode" class="hljs block font-inherit" v-html="highlightedCode"></code><code v-else class="block font-inherit">{{ sourceCode }}</code></pre>
        </div>
      </TabsContent>

      <TabsContent
        value="markdown"
        class="min-h-0 min-w-0 flex-1 overflow-auto rounded bg-white p-3 text-black-950 outline-none"
        aria-label="遊戲組 Markdown 介紹"
      >
        <Markdown>{{ MdGame }}</Markdown>
      </TabsContent>
    </TabsRoot>
  </Window>
</template>

<script setup lang="ts">
import { PhFile, PhFloppyDisk, PhPlay, PhSteps, PhStop } from "@phosphor-icons/vue";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import MdGame from "@/content/divisions/game.md?raw";

const open = defineModel<boolean>("open", { default: false });
const menuItems = ["檔案", "編輯", "原始", "工具", "關於"];
const tools = [
  { label: "新增檔案", icon: PhFile },
  { label: "儲存", icon: PhFloppyDisk },
  { label: "執行", icon: PhPlay },
  { label: "停止", icon: PhStop },
  { label: "逐步執行", icon: PhSteps },
];
const tabClass =
  "shrink-0 rounded bg-black-800 px-2 py-1 text-white outline-none transition-colors hover:bg-black-700 focus-visible:ring-2 focus-visible:ring-blue data-[state=active]:border-b data-[state=active]:border-black-400 data-[state=active]:bg-black-700";
const codeLines = [
  "namespace TaichungFirstSeniorHigh.DigitalCreation {",
  "    /// <summary>",
  "    /// 遊戲組：將奇思妙想化為可互動世界的技術領域",
  "    /// </summary>",
  "    public class GameDevelopmentSubgroup : SubgroupBase {",
  '        public override string Name => \"遊戲組 (Game Dev)\";',
  '        public override string TargetAudience => \"對遊戲引擎、程式邏輯、遊戲企劃或美術結合充滿熱情的創作者\";',
  "",
  "        // 組別核心職責",
  "        private readonly string[] responsibilities = {",
  '            \"遊戲企劃與玩法設計 (Game Design & Mechanics)\",',
  '            \"程式邏輯與引擎實作 (Unity / Unreal Engine)\",',
  '            \"遊戲美術與動畫整合 (2D/3D Assets Integration)\",',
  '            \"音效與數值平衡 (Audio & Balance Tuning)\"',
  "        };",
  "",
  "        // 推薦使用的開發工具",
  "        private readonly string[] techStack = {",
  '            \"Unity (C#)\",',
  '            \"Unreal Engine (Blueprints / C++)\",',
  '            \"Godot\",',
  '            \"Git / GitHub (版本控制與協作)\"',
  "        };",
  "",
  "        public void DescribeSubgroup() {",
  '            Console.WriteLine($\"歡迎來到 {Name}！\");',
  '            Console.WriteLine(\"在這裡，不只是玩遊戲，更是「創造」遊戲。\");',
  "",
  "            // 透過專案實作凝聚團隊",
  "            while (HasPassionAndCreativity) {",
  "                WriteCode();",
  "                FixBugs(); // 這是日常",
  "                PublishDemo();",
  "            }",
  "        }",
  "    }",
  "}",
];
const sourceCode = codeLines.join("\n");
const highlightedCode = ref("");

onMounted(() => {
  hljs.registerLanguage("csharp", csharp);
  highlightedCode.value = hljs.highlight(sourceCode, { language: "csharp" }).value;
});
</script>

<style scoped>
:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: var(--color-black-400);
}
:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-literal) {
  color: var(--color-purple);
}
:deep(.hljs-string),
:deep(.hljs-doctag) {
  color: var(--color-lime);
}
:deep(.hljs-title),
:deep(.hljs-title.class_),
:deep(.hljs-title.function_),
:deep(.hljs-type) {
  color: #68a7ff;
}
:deep(.hljs-number),
:deep(.hljs-meta),
:deep(.hljs-built_in) {
  color: #ff9f68;
}
</style>
