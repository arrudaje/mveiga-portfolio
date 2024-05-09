<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { ACCORDEON_OPEN } from ".";
import chevron from "@/assets/svg/chevron.svg";

const props = withDefaults(
  defineProps<{
    id?: string;
    title: string;
  }>(),
  {
    id: String(new Date().getTime()),
  }
);
const emit = defineEmits<{
  open: [id: string];
}>();
const injected = inject(ACCORDEON_OPEN);

const localOpen = ref(false);
const isOpen = computed(() => injected ? injected.value === props.id : localOpen.value);
const openAccordeon = () => {
  localOpen.value = !localOpen.value;
  if (injected) emit('open', props.id);
}
</script>

<template>
  <div class="accordeon" :class="{ 'accordeon--open': isOpen }">
    <header class="accordeon__header" @click="openAccordeon">
      <div class="accordeon__header__title">{{ title }}</div>
      <img :src="chevron" class="accordeon__header__chevron" />
    </header>
    <main class="accordeon__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.accordeon {
  &__header {
    padding: 16px;

    &__title {

    }

    &__chevron {
      transition: transform 0.25s ease-out;
    }
  }

  &--open {
    .accordeon__header__chevron {
      transform: rotate(-90deg);
    }
  }
}
</style>
