<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { RouterView } from "vue-router";
import { CHANGE_THEME } from "@/util/symbols";

const theme = ref("style-1");

provide(CHANGE_THEME, (value: number) => {
  switch (value) {
    case 1:
    default:
      theme.value = "style-1";
      break;
    case 2:
      if (theme.value == "style-2") {
        theme.value = "style-1";
      } else theme.value = "style-2";
      break;
    case 3:
      if (theme.value == "style-3") {
        theme.value = "style-1";
      } else theme.value = "style-3";
      break;
  }
});
</script>

<template>
  <RouterView class="wrapper" :class="theme" />
</template>

<style lang="scss">
.wrapper.style-1 {
  --color-highlight: var(--color-1);
  --color-second: var(--color-2);
  --color-third: var(--color-3);
}

.wrapper.style-2 {
  --color-highlight: var(--color-2);
  --color-second: var(--color-1);
  --color-third: var(--color-3);
}

.wrapper.style-3 {
  --color-highlight: var(--color-3);
  --color-second: var(--color-2);
  --color-third: var(--color-1);
}
</style>