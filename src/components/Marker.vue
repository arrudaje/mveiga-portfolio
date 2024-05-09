<script lang="ts" setup>
import { computed, ref } from "vue";

const element = ref<HTMLSpanElement>();
const degree = computed(() => {
  if (element.value) {
    const up = Boolean(Math.round(Math.random()));
    const { width, height } = element.value.getBoundingClientRect();
    const diagonal = Math.sqrt(
      Math.pow(width, 2) +
        Math.pow(height, 2) -
        2 * width * height * Math.cos(90)
    );
    const angle = Math.acos(
      (Math.pow(diagonal, 2) + Math.pow(width, 2) - Math.pow(height, 2)) /
        (2 * diagonal * width)
    );
    const deg = Math.round(angle * (180 / Math.PI) * 0.1);
    return `${up ? 360 - deg : deg}deg`;
  }
});
const background = computed(
  () => `linear-gradient(
    ${degree.value},
    transparent 0%,
    transparent 10%,
    #ffff00 11%,
    #ffff00 90%,
    transparent 91%,
    transparent 100%
  )`
);
</script>

<template>
  <span ref="element" class="marker">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.marker {
  display: inline-flex;
  align-items: baseline;
  line-height: 2em;
  margin: -0.5em -0.2em;
  padding: 0 0.2em;
  background: v-bind(background);
}
</style>
