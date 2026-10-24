<script setup lang="ts">
import "~/assets/css/terminal.css";

import { nextTick, onMounted, ref, watch } from "vue";

import { useTerminal } from "~/composables/useTerminal";
import type { TerminalCommand } from "~/types/terminal";

const props = withDefaults(
  defineProps<{
    /**
     * 終端機的指令提示符字串
     * 用於設定命令列介面顯示的提示字元格式
     * @default "guest@tcddc:~$"
     * @example "guest@tcddc:~$"
     */
    commandPrompt?: string;

    /**
     * 終端機支援的指令清單
     * 包含所有可供使用者輸入並執行的命令定義物件集合
     * @default []
     * @example [{ name: "help", description: "顯示可用指令列表", onCalled: ... }]
     */
    commands?: TerminalCommand[];

    /**
     * 終端機初始化完成後的回呼函式
     * 接收終端機上下文實例作為參數，可用於在元件掛載時自動執行特定初始化指令或輸出歡迎訊息
     * @param c 終端機上下文物件，提供畫面輸出與狀態管理方法
     * @returns 執行結果可為空值或非同步 Promise 物件
     */
    getIn?: TerminalCommand["onCalled"] extends (
      c: infer C,
      ...args: never[]
    ) => unknown
      ? (c: C) => void | Promise<void>
      : never;
  }>(),
  {
    commandPrompt: "guest@tcddc:~$",
    commands: () => [],
  },
);

const terminalBody = ref<HTMLElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const inputRow = ref<HTMLElement | null>(null);
const inputMeasure = ref<HTMLElement | null>(null);
const cursorOffset = ref(0);
const commandHistory = ref<string[]>([]);
let historyIndex = -1;
let historyDraft = "";
let completionCandidates: string[] = [];
let completionIndex = -1;

function focusInput() {
  inputElement.value?.focus();
}

onMounted(() => {
  focusInput();
});

const { lines, input, running, context, resolveColor, executeCommand } =
  useTerminal(
    () => props.commands,
    () => props.commandPrompt,
    terminalBody,
  );

const updateCursorOffset = async () => {
  await nextTick();
  if (!inputElement.value || !inputRow.value || !inputMeasure.value) return;

  inputMeasure.value.textContent = inputElement.value.value.slice(
    0,
    inputElement.value.selectionStart ?? inputElement.value.value.length,
  );
  const rowLeft = inputRow.value.getBoundingClientRect().left;
  const inputLeft = inputElement.value.getBoundingClientRect().left;
  cursorOffset.value =
    inputLeft - rowLeft + inputMeasure.value.getBoundingClientRect().width;
};

function resetCompletion() {
  completionCandidates = [];
  completionIndex = -1;
}

function setInput(value: string) {
  input.value = value;
  void nextTick(() => {
    const element = inputElement.value;
    if (!element) return;
    element.setSelectionRange(value.length, value.length);
    void updateCursorOffset();
  });
}

function onInput() {
  historyIndex = -1;
  historyDraft = "";
  resetCompletion();
  void updateCursorOffset();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    setInput("");
    historyIndex = -1;
    historyDraft = "";
    resetCompletion();
    return;
  }

  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    const history = commandHistory.value;
    if (!history.length) return;
    event.preventDefault();
    resetCompletion();

    if (historyIndex === -1) {
      historyDraft = input.value;
      historyIndex = history.length;
    }

    historyIndex =
      event.key === "ArrowUp"
        ? Math.max(0, historyIndex - 1)
        : Math.min(history.length, historyIndex + 1);
    setInput(
      historyIndex === history.length
        ? historyDraft
        : (history[historyIndex] ?? ""),
    );
    return;
  }

  if (event.key !== "Tab") return;
  event.preventDefault();

  const commandText = input.value;
  if (/\s/.test(commandText)) return;

  if (!completionCandidates.length) {
    const prefix = commandText.toLowerCase();
    completionCandidates = [
      ...props.commands.map((command) => command.name),
      "help",
      "clear",
    ].filter(
      (name, index, names) =>
        name.toLowerCase().startsWith(prefix) &&
        names.findIndex(
          (candidate) => candidate.toLowerCase() === name.toLowerCase(),
        ) === index,
    );
    completionIndex = -1;
  }

  if (!completionCandidates.length) return;
  completionIndex = (completionIndex + 1) % completionCandidates.length;
  setInput(completionCandidates[completionIndex] ?? "");
}

function submitCommand() {
  const command = input.value.trim();
  if (command && !running.value) {
    commandHistory.value.push(command);
    historyIndex = -1;
    historyDraft = "";
  }
  resetCompletion();
  void executeCommand(input.value);
}

watch(input, updateCursorOffset);

onMounted(async () => {
  await updateCursorOffset();
  if (!props.getIn) return;

  try {
    await props.getIn(context);
  } catch (error) {
    context.print([
      {
        color: "--terminal-error",
        content: "Initialization error: ",
      },
      {
        content: error instanceof Error ? error.message : String(error),
      },
    ]);
  }
});
</script>

<template>
  <div class="terminal" @click="focusInput">
    <div
      ref="terminalBody"
      class="terminal__body h-full"
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
    >
      <div v-for="line in lines" :key="line.id" class="terminal__line">
        <template v-if="line.prompt">
          <span class="terminal__prompt">{{ line.prompt }}</span>
          <span class="terminal__input-echo">
            {{ line.content.map((segment) => segment.content).join("") }}
          </span>
        </template>

        <template v-else>
          <span
            v-for="(segment, index) in line.content"
            :key="index"
            :style="{ color: resolveColor(segment.color) }"
            >{{ segment.content }}</span
          >
        </template>
      </div>

      <form
        ref="inputRow"
        class="terminal__input-row"
        @submit.prevent="submitCommand"
      >
        <label class="terminal__prompt" for="terminal-command">
          {{ commandPrompt }}
        </label>

        <input
          ref="inputElement"
          id="terminal-command"
          v-model="input"
          class="terminal__input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          :disabled="running"
          @input="onInput"
          @keydown="onKeydown"
          @keyup="updateCursorOffset"
          @click="updateCursorOffset"
          aria-label="Enter a terminal command"
        />

        <span
          ref="inputMeasure"
          class="terminal__measure"
          aria-hidden="true"
        ></span>
        <span
          v-if="!running"
          class="terminal__cursor"
          :style="{ left: `${cursorOffset}px` }"
          aria-hidden="true"
        ></span>
      </form>
    </div>
  </div>
</template>
