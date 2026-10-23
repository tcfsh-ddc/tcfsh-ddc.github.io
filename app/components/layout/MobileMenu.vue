<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="block md:hidden">
      <PhList :size="28" class="text-black-50" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>
        <NuxtLink to="/about" class="flex w-full h-full items-center">
          <SvgoAbout :filled="true" class="!h-6 !w-6 mr-2" />
          <p>關於</p>
        </NuxtLink>
      </DropdownMenuItem>
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
