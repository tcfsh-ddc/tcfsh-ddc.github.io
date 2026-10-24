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

const commands = [...terminalCommands, ...ddcCommands];

function handleGreeting(c: TerminalContext) {
  c.print("歡迎來到數創 - Kitty");
}
</script>
