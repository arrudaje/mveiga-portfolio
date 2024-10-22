<script lang="ts" setup>
import {
  computed,
  inject,
  ref,
  onMounted,
  nextTick,
  useTemplateRef,
  useId,
  watch,
} from "vue";
import { ACCORDEON_OPEN } from ".";
import chevron from "@/assets/svg/chevron.svg";

const props = defineProps<{
  id?: string;
  open?: boolean;
}>();
const emit = defineEmits<{
  open: [id: string];
}>();
const injected = inject(ACCORDEON_OPEN);

const localOpen = ref(false);
const mainRef = useTemplateRef("main-ref");
const id = ref(props.id || useId());
const mainHeight = ref("0px");

const isOpen = computed(() =>
  injected ? injected.value === id.value : localOpen.value
);

const updateMainHeight = async () => {
  await nextTick();
  if (mainRef.value) {
    if (isOpen.value) {
      mainHeight.value = `${mainRef.value.scrollHeight}px`;
    } else {
      mainHeight.value = "0px";
    }
  }
};
const openAccordeon = () => {
  localOpen.value = !localOpen.value;
  if (injected) emit("open", id.value);

  updateMainHeight();
};

watch(isOpen, updateMainHeight);

onMounted(() => {
  if (props.open) {
    localOpen.value = props.open;
    emit("open", id.value);
  }

  if (mainRef.value) {
    updateMainHeight();
  }
});
</script>

<template>
  <div class="accordeon" :class="{ 'accordeon--open': isOpen }">
    <header class="accordeon__header" @click="openAccordeon">
      <div class="accordeon__header__title">
        <slot name="title" />
      </div>
      <img :src="chevron" class="accordeon__header__chevron" />
    </header>
    <main class="accordeon__main" ref="main-ref">
      <div class="accordeon__main-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.accordeon {
  &__header {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
    }

    &__chevron {
      transition: transform 0.25s ease-out;
      width: 16px;
      height: 16px;
    }
  }

  &__main {
    overflow: hidden;
    transition: height 0.25s ease-out;
    height: v-bind(mainHeight);
  }

  &__main-content {
    padding: 0 16px 16px;
  }

  &--open {
    .accordeon__header__chevron {
      transform: rotate(-90deg);
    }
  }
}
</style>
