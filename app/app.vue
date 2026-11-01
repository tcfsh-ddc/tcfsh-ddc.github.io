<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

const pageTransition = {
  name: "desktop-page",
  css: false,
  mode: "out-in" as const,
  onEnter(element: Element, done: () => void) {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 14, scale: 0.99 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
        onComplete: done,
      },
    );
  },
  onLeave(element: Element, done: () => void) {
    gsap.to(element, {
      autoAlpha: 0,
      y: -10,
      duration: 0.18,
      ease: "power1.in",
      onComplete: done,
    });
  },
};
</script>
