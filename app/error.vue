<script setup lang="ts">
import { PhArrowUUpLeft } from "@phosphor-icons/vue";
import type { NuxtError } from "#app";

import Terminal from "~/components/Terminal.vue";

defineProps<{
  error: NuxtError;
}>();

const diagnosticLines: (string | TerminalSegment[])[] = [
  [
    { color: "#9EA93F", content: "sam" },
    { color: "#60712F", content: "@" },
    { color: "#9EA93F", content: "system" },
    { color: "#ffffff", content: ":" },
    { color: "#5bc0eb", content: "~" },
    { color: "#ffffff", content: "$ " },
    { color: "#ffffff", content: "uname -a" },
  ],
  "Linux system 6.12.0-generic #1 SMP x86_64 GNU/Linux",
  "",
  [
    { color: "#9EA93F", content: "sam@system" },
    { color: "#ffffff", content: ":" },
    { color: "#5bc0eb", content: "~" },
    { color: "#ffffff", content: "$ " },
    { color: "#ffffff", content: "systemctl status application" },
  ],
  [
    { color: "#ffffff", content: "● " },
    { color: "#ff5555", content: "application.service" },
    { color: "#60712F", content: " - Application Service" },
  ],
  [
    { color: "#ffffff", content: "     Loaded: " },
    { color: "#9EA93F", content: "loaded" },
    { color: "#60712F", content: " (/etc/systemd/system/application.service)" },
  ],
  [
    { color: "#ffffff", content: "     Active: " },
    { color: "#ff5555", content: "failed" },
    { color: "#60712F", content: "(Result: exit-code)" },
  ],
  [
    { color: "#ffffff", content: "       Docs: " },
    { color: "#5bc0eb", content: "man:systemd.service(5)" },
  ],
  "",
  [
    { color: "#9EA93F", content: "sam@system" },
    { color: "#ffffff", content: ":" },
    { color: "#5bc0eb", content: "~" },
    { color: "#ffffff", content: "$ " },
    { color: "#ffffff", content: "journalctl -u application -n 5 --no-pager" },
  ],
  [
    { color: "#60712F", content: "Oct 24 19:32:01 system application[1204]: " },
    { color: "#ff5555", content: "ERROR" },
    { color: "#ffffff", content: ": Failed to initialize application" },
  ],
  [
    { color: "#60712F", content: "Oct 24 19:32:01 system application[1204]: " },
    { color: "#ff5555", content: "ERROR" },
    { color: "#ffffff", content: ": Unable to resolve requested resource" },
  ],
  [
    { color: "#60712F", content: "Oct 24 19:32:01 system application[1204]: " },
    { color: "#e5c07b", content: "WARNING" },
    { color: "#ffffff", content: ": Running diagnostic recovery..." },
  ],
  "",
  [
    { color: "#9EA93F", content: "sam@system" },
    { color: "#ffffff", content: ":" },
    { color: "#5bc0eb", content: "~" },
    { color: "#ffffff", content: "$ " },
    { color: "#ffffff", content: "echo $?" },
  ],
  [
    {
      color: "#ff5555",
      content: "1",
    },
  ],
];
</script>

<template>
  <div
    class="error-page relative isolate h-dvh w-dvw overflow-hidden bg-black-950 text-black-50"
  >
    <!-- 背景終端機 -->
    <div
      class="error-terminal pointer-events-none absolute inset-0 blur-[2px]"
      aria-hidden="true"
    >
      <Terminal
        command-prompt="root@system:~#"
        :background="true"
        :background-lines="diagnosticLines"
        :background-interval="200"
      />
    </div>

    <!-- 深色遮罩 -->
    <div class="pointer-events-none absolute inset-0 z-10 bg-black/75" />

    <!-- 錯誤資訊 -->
    <main
      class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 class="text-7xl font-extrabold">
        {{ error.status || 500 }}
      </h1>

      <p class="text-3xl">
        {{ error.statusText || "Unexpected Error" }}
      </p>

      <p class="max-w-lg text-sm leading-7 text-black-300">
        An unexpected error has occurred. The system is attempting to collect
        diagnostic information.
      </p>

      <NuxtLink
        class="mt-4 flex items-center gap-2 text-xl text-black-200 transition-all hover:gap-6 hover:text-purple"
        to="/"
      >
        <PhArrowUUpLeft :size="24" />
        Go back home
      </NuxtLink>
    </main>
  </div>
</template>

<style scoped>
.error-terminal :deep(.terminal) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.error-terminal :deep(.terminal__body) {
  height: 100%;
  overflow: hidden;
  padding: 1.5rem;
  color: var(--terminal-muted, #fff);
  font-family: monospace;
  line-height: 1.8;
}

@media (max-width: 640px) {
  .error-terminal :deep(.terminal__body) {
    padding: 0.75rem;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-terminal {
    filter: none;
  }
}
</style>
