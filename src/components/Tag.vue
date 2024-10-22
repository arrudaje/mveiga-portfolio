<script lang="ts" setup>
import type { Color } from "@/util/enums";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    text?: string;
    color?: Color;
    size?: "small" | "medium" | "large";
  }>(),
  {
    size: "small",
  }
);

const computedColor = computed(() => {
  return props.color ?? "var(--color-white)";
});

const fontSize = computed(() => {
  switch (props.size) {
    case "small":
      return "10px";
    case "medium":
      return "12px";
    case "large":
      return "14px";
    default:
      return "10px";
  }
});

const lineHeight = computed(() => {
  switch (props.size) {
    case "small":
      return "20px";
    case "medium":
      return "22px";
    case "large":
      return "24px";
    default:
      return "20px";
  }
});
</script>

<template>
  <span class="tag">
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="scss" scoped>
.tag {
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: v-bind(computedColor);
  font-size: v-bind(fontSize);
  font-style: normal;
  font-weight: 700;
  line-height: v-bind(lineHeight);
  letter-spacing: 0.2px;
  text-transform: uppercase;
  cursor: default;
}
</style>
