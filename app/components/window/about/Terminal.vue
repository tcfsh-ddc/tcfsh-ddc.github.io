<template>
  <Window
    :initial-x="0"
    :initial-y="0"
    :show-close-button="true"
    :content-padding="false"
    default-status="maxmium"
  >
    <template #titlebar>
      <p class="text-black-50">關於數創 - Kitty</p>
    </template>

    <div class="bg-black-900 h-full w-full">
      <Terminal :commands="commands" class="h-full p-2" />
    </div>
  </Window>
</template>

<script setup>
import Terminal from "~/components/Terminal.vue";
import { terminalCommands } from "@/utils/terminalCommands";

const commands = [...terminalCommands, {}];
</script>
