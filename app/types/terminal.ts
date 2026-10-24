export interface TerminalSegment {
  /** CSS 顏色或 CSS 自訂屬性名稱，例如 #fff、--terminal-accent */
  color?: string;
  css?: string | Record<string, string | number>;
  class?: string | string[] | Record<string, boolean>;
  content: string;
}

export interface TerminalContext {
  print: (content: string | TerminalSegment[]) => void;
  clear: () => void;
}

export interface TerminalCommand {
  /** 用來呼叫指令的名稱 */
  name: string;

  /** help 指令中顯示的說明 */
  description: string;

  /** c 為終端機操作介面；args 為參數；raw 為完整輸入 */
  onCalled: (
    c: TerminalContext,
    args: string[],
    raw: string,
  ) => void | Promise<void>;
}

export interface TerminalLine {
  id: number;
  prompt?: string;
  content: TerminalSegment[];
}
