import type { InjectionKey, Ref } from "vue";

export interface WindowBounds {
  width: number;
  height: number;
}

export interface WindowsContainerContext {
  element: Readonly<Ref<HTMLElement | null>>;
  bounds: Readonly<Ref<WindowBounds>>;
  bringToFront: (windowId: symbol) => number;
  registerWindow: (
    windowId: symbol,
    window: {
      close: () => void;
      isOpen: () => boolean;
      zIndex: () => number;
    },
  ) => void;
  unregisterWindow: (windowId: symbol) => void;
}

export const windowsContainerKey: InjectionKey<WindowsContainerContext> =
  Symbol("windows-container");
