import { nextTick, ref, type Ref } from "vue";

import type {
  TerminalCommand,
  TerminalContext,
  TerminalLine,
  TerminalSegment,
} from "~/types/terminal";

export function useTerminal(
  commands: () => TerminalCommand[],
  commandPrompt: () => string,
  terminalBody: Ref<HTMLElement | null>,
) {
  const lines = ref<TerminalLine[]>([]);
  const input = ref("");
  const running = ref(false);

  let nextLineId = 0;

  function normalizeSegments(
    content: string | TerminalSegment[],
  ): TerminalSegment[] {
    if (typeof content === "string") {
      return [{ content }];
    }

    return content.map((segment) => ({
      ...segment,
      content: String(segment.content),
    }));
  }

  function scrollToBottom() {
    void nextTick(() => {
      const element = terminalBody.value;

      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  }

  function print(content: string | TerminalSegment[]) {
    lines.value.push({
      id: nextLineId++,
      content: normalizeSegments(content),
    });

    scrollToBottom();
  }

  function clear() {
    lines.value = [];
  }

  const context: TerminalContext = {
    print,
    clear,
  };

  function resolveColor(color?: string): string | undefined {
    if (!color) return undefined;

    return color.startsWith("--") ? `var(${color})` : color;
  }

  function printCommand(name: string, description: string) {
    print([
      {
        color: "--terminal-command",
        content: name,
      },
      {
        color: "--terminal-muted",
        content: `  ${description}`,
      },
    ]);
  }

  async function executeCommand(raw: string) {
    const value = raw.trim();

    if (!value || running.value) return;

    lines.value.push({
      id: nextLineId++,
      prompt: commandPrompt(),
      content: [{ content: value }],
    });

    input.value = "";
    scrollToBottom();

    const [name, ...args] = value.split(/\s+/);
    const normalizedName = name?.toLowerCase();

    if (normalizedName === "clear") {
      clear();
      return;
    }

    if (normalizedName === "help") {
      print("Available commands:");

      for (const command of commands()) {
        printCommand(command.name, command.description);
      }

      printCommand("help", "Show available commands");
      printCommand("clear", "Clear the terminal");
      return;
    }

    const command = commands().find(
      (item) => item.name.toLowerCase() === normalizedName,
    );

    if (!command) {
      print([
        {
          color: "--terminal-error",
          content: `Command not found: ${name}`,
        },
        {
          color: "--terminal-muted",
          content: " (type help for available commands)",
        },
      ]);

      return;
    }

    running.value = true;

    try {
      await command.onCalled(context, args, value);
    } catch (error) {
      print([
        {
          color: "--terminal-error",
          content: "Error: ",
        },
        {
          content: error instanceof Error ? error.message : String(error),
        },
      ]);
    } finally {
      running.value = false;
      scrollToBottom();
    }
  }

  return {
    lines,
    input,
    running,
    context,
    print,
    clear,
    resolveColor,
    executeCommand,
  };
}
