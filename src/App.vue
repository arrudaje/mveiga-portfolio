<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { RouterView } from "vue-router";
import { CHANGE_THEME } from "@/util/symbols";

const theme = ref("style-1");

const d1 = ref(0);
const d2 = ref(0);
const d3 = ref(0);

setInterval(() => d1.value = Math.random() * 20, 1700);
setInterval(() => d2.value = Math.random() * 20, 800);
setInterval(() => d3.value = Math.random() * 20, 2600);

const d1px = computed(() => `${d1.value}px`);
const d2px = computed(() => `${d2.value}px`);
const d3px = computed(() => `${d3.value}px`);

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
  <div class="app__construction">
      Portfolio website under construction
      <div class="app__construction__dots">
        <div class="app__construction__dots__dot app__construction__dots__dot--one"></div>
        <div class="app__construction__dots__dot app__construction__dots__dot--two"></div>
        <div class="app__construction__dots__dot app__construction__dots__dot--three"></div>
      </div>
    </div>
  <RouterView class="wrapper" :class="theme" />
</template>

<style lang="scss">
.app__construction {
  font-size: 30px;
  text-align: center;
  font-weight: 700;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: inline-flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__dots {
    height: 40px;
    display: flex;
    gap: 4px;

    &__dot {
      display: flex;
      align-items: flex-end;
      height: 40px;
      width: 20px;
      border-radius: 20px;
      background: rgba(0, 0, 0, 0.3);
      mix-blend-mode: multiply;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.8);

      &::before {
        content: '';
        display: block;
        transition: margin-bottom 0.3s ease-out;
        height: 20px;
        width: 20px;
        border-radius: 10px;
      }
      
      &--one::before {
        background: var(--color-1);
        margin-bottom: v-bind(d1px);
      }

      &--two::before {
        background: var(--color-2);
        margin-bottom: v-bind(d2px);
      }

      &--three::before {
        background: var(--color-3);
        margin-bottom: v-bind(d3px);
      }
    }
  }
}

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