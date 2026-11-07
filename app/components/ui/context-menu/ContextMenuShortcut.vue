<template>
  <span
    v-bind="$attrs"
    class="ml-auto shrink-0 pl-6 text-base leading-6 tracking-widest text-black-300"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>
