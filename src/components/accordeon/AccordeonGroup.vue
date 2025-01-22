<script lang="ts" setup>
import { provide, ref } from "vue";
import { ACCORDEON_OPEN } from ".";

const open = ref<string>();
provide(ACCORDEON_OPEN, open);

const openAccordeon = (id: string) => {
  if (open.value === id) open.value = undefined;
  else open.value = id;
}
</script>

<template>
  <div class="accordeon-group">
    <slot @open="openAccordeon" />
  </div>
</template>

<style lang="scss" scoped>
.accordeon-group {
  :slotted(.accordeon) {
    border-bottom: 1px solid var(--color-text);

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
