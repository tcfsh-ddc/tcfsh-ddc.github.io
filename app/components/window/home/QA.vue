<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="demo-window demo-window--notes"
    :initial-x="600"
    :initial-y="70"
    :initial-width="390"
    :initial-height="500"
    :min-width="260"
    :min-height="190"
  >
    <template #titlebar>
      <p class="text-black-50">Q&A - 台中一中數位創作研究社</p>
    </template>

    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <AccordionRoot
        default-value="item-1"
        type="single"
        :collapsible="true"
        class="grid min-h-0 min-w-0 flex-1 content-start grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-x-3 overflow-y-auto overflow-x-hidden"
      >
        <AccordionItem
          v-for="item in accordionItems"
          :key="item.value"
          :value="item.value"
          class="min-w-0 overflow-hidden border-b-2 border-gray-700"
        >
          <AccordionHeader class="flex min-w-0 p-1">
            <AccordionTrigger
              class="qa-trigger flex w-full min-w-0 items-start justify-between gap-2 text-base text-black-50 text-left"
            >
              <span
                class="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere]"
              >
                {{ item.title }}
              </span>

              <PhPlus
                :size="16"
                class="shrink-0 text-purple transition-transform duration-300 data-[state=open]:rotate-45"
                weight="thin"
              />
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent
            class="qa-content min-w-0 text-black-200 [overflow-wrap:anywhere]"
          >
            <div class="px-5 py-4 whitespace-pre-line">
              {{ item.content }}
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";
import { PhPlus } from "@phosphor-icons/vue";

const open = defineModel<boolean>("open", {
  default: false,
});

const accordionItems = [
  {
    value: "doing",
    title: "數創平常在幹嘛？",
    content:
      "話雖如此，我們卻也不能夠這麼篤定。所謂電繪組，關鍵是電繪組需要如何解讀。馬克思曾講過，在科學上面沒有平坦的大道，只有不畏勞苦沿著陡峭的山路攀登的人，才有希望達以光輝的頂點。這是撼動人心的。",
  },
  {
    value: "difference",
    title: "數創與電研差在哪裡？",
    content:
      "首先，我們與電研（電腦資訊研究社）並沒有誰是主誰是從的分別。千萬不要抱持著選不上電研就來數創之類的想法。\n\n數創主線在於創作、創意與作品，比如繪畫、遊戲開發或音樂製作；而電研則著重於學習程式設計與電腦的架構。\n\n因此如果你對程式設計有興趣，那電研或許會更適合你；而如果你對畫圖、遊戲、音樂或其它各式「創意作品」有興趣，那數創絕對會是你的不二選擇！",
  },
  {
    value: "ability",
    title: "加入數創需要哪些能力？",
    content:
      "如果你已經會使用相關軟體了那最好，但如果你沒有，那也沒關係。社課的過程中我們會盡量用最淺顯易懂的語言教會你，因此不要怕第一次體驗，也不要怕不懂。放心加入我們，去做就對了！",
  },
  {
    value: "step",
    title: "零經驗會不會跟不上？",
    content:
      "這點各位大可放一百個心。\n\n我們相信總是會有人是第一次接觸創作。如果從一開始就把大家阻擋在高牆之外，又有誰敢認真踏出創作的一步呢？\n\n我們的教學由簡入繁，保證你可以聽得懂、聽得會、聽得爽！",
  },
  {
    value: "essentials",
    title: "需要準備什麼？",
    content:
      "看各組別而定。\n\n電繪組可以自己準備繪圖板或平板，當然社團也有提供！遊戲組會需要一台已經裝好Unity引擎的電腦，因為學校電腦的效能不是很好。音樂組的軟體是FL Studio，也建議可以自備一台安裝好的電腦。\n\n但最重要的還是你要有一顆熱愛創作的心！",
  },
];
</script>

<style scoped>
@keyframes slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }

  to {
    height: 0;
  }
}

.qa-trigger:hover {
  background-color: var(--mauve-2);
}

.qa-content {
  overflow: hidden;
}

.qa-content[data-state="open"] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.qa-content[data-state="closed"] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
</style>
