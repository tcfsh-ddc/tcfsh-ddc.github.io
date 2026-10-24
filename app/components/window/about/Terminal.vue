<template>
  <Window
    :initial-x="0"
    :initial-y="0"
    :show-close-button="false"
    :maxable="false"
    :content-padding="false"
    :allow-double-maxmize="false"
    :movable="false"
    :resizable="false"
    default-status="maxmium"
  >
    <template #titlebar>
      <p class="text-black-50">關於數創 - Kitty</p>
    </template>

    <div class="bg-black-900 h-full w-full">
      <Terminal
        :commands="commands"
        :get-in="handleGreeting"
        class="h-full p-2 text-base"
      />
    </div>
  </Window>
</template>

<script setup lang="ts">
import Terminal from "~/components/Terminal.vue";
import { terminalCommands } from "@/utils/terminalCommands";
import { ddcCommands } from "#imports";
import { bebo } from "~/consts/bebo";

const commands: TerminalCommand[] = [
  ...terminalCommands,
  ...ddcCommands,
  {
    name: "graph",
    description: "畫一隻可愛的嗶啵，給定 `--text` 以顯示完整訊息",
    onCalled(c, args) {
      c.print("");

      if (args[0] == "-t" || args[0] == "--text" || args[0] == "-T") {
        handleGreeting(c);
      } else {
        for (const line of bebo) {
          c.print([
            {
              content: "  ",
            },
            ...line,
          ]);
        }
      }

      c.print("");
    },
  },
];

function handleGreeting(c: TerminalContext) {
  c.print("");

  for (const line of bebo) {
    c.print([
      {
        content: "  ",
      },
      ...line,
    ]);
  }

  c.print("\n\n");

  c.print([
    { content: "      " },
    {
      content: "台中一中",
      color: "--color-black-400",
      class: "font-extrabold",
    },
    {
      content: "數位",
      color: "--color-purple",
      class: "font-extrabold",
    },
    {
      content: "創作",
      color: "--color-lime",
      class: "font-extrabold",
    },
    {
      content: "研究社",
      color: "--color-blue",
      class: "font-extrabold",
    },
  ]);
  c.print([
    {
      content: "      Version 21.0 without Linux 6.7",
      color: "--color-black-400",
    },
  ]);
  c.print([
    {
      content: "      使用 ",
      color: "--color-black-400",
    },
    {
      content: "help",
      color: "--color-black-50",
      class: "underline underline-offset-4",
    },
    {
      content: " 以了解所有可用指令，使用 ",
      color: "--color-black-400",
    },
    {
      content: "home",
      color: "--color-black-50",
      class: "underline underline-offset-4",
    },
    {
      content: " 回到首頁",
      color: "--color-black-400",
    },
  ]);

  c.print("\n\n");
}
</script>
