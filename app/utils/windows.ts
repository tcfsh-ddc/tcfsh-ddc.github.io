import type { InjectionKey, Ref } from "vue";

export interface WindowBounds {
  width: number;
  height: number;
}

export interface WindowsContainerContext {
  element: Readonly<Ref<HTMLElement | null>>;
  bounds: Readonly<Ref<WindowBounds>>;
  bringToFront: () => number;
}

export const windowsContainerKey: InjectionKey<WindowsContainerContext> =
  Symbol("windows-container");
