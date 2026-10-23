<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="block md:hidden">
      <PhChat :size="28" class="text-black-50" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem class="flex gap-4">
        <a
          href="https://www.instagram.com/tcfsh.ddc"
          class="flex w-full h-full items-center"
        >
          <SvgoInstagram class="!h-6 !w-6 mr-2" />
          <p>Instagram</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex gap-4">
        <a
          href="https://www.facebook.com/tcfshDDC"
          class="flex w-full h-full items-center"
        >
          <SvgoFacebookRound class="!h-6 !w-6 mr-2" />
          <p>Facebook</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex gap-4">
        <a
          href="https://www.threads.com/@tcfsh.ddc"
          class="flex w-full h-full items-center"
        >
          <SvgoThreads class="!h-6 !w-6 mr-2" />
          <p>Threads</p>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex gap-4">
        <a
          href="https://github.com/tcfsh-ddc"
          class="flex w-full h-full items-center"
        >
          <SvgoGithub class="!h-6 !w-6 mr-2" />
          <p>GitHub</p>
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import DropdownMenu from "../ui/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/DropdownMenuItem.vue";
import { PhChat } from "@phosphor-icons/vue";
</script>
