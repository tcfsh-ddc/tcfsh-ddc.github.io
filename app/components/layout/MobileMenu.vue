<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="block md:hidden">
      <PhList :size="32" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>關於</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import DropdownMenu from "../ui/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/DropdownMenuItem.vue";
import { PhList } from "@phosphor-icons/vue";
</script>
