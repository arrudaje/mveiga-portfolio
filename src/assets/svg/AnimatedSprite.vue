<script lang="ts" setup>
import { computed, ref, watch, useTemplateRef, nextTick } from "vue";
import { useInterval, useMounted } from "@vueuse/core";
import type { Offset } from "@/types/types";
import { Animation } from "@/util/enums";

const props = withDefaults(
  defineProps<{
    height: number;
    width: number;
    offset: Offset;
    interval?: number;
    intervalAnimation?: number;
    delay?: number;
    animation?: Animation;
  }>(),
  {
    interval: 1000,
  }
);

const spriteRef = useTemplateRef("sprite");
const isMounted = useMounted();

const height = computed(() => `${props.height}px`);
const width = computed(() => `${props.width}px`);
const left = computed(() => `${props.offset.left}px`);
const top = computed(() => `${props.offset.top}px`);
const duration = computed(
  () => `${props.intervalAnimation ?? props.interval}ms`
);
const delay = computed(() => `${props.delay ?? 0}ms`);
const sprites = ref<(SVGElement | HTMLImageElement)[]>([]);
const displayIndex = ref(0);

const { counter, pause, resume } = useInterval(props.interval || 1000, {
  controls: true,
  immediate: true,
});

watch(counter, (value) => {
  displayIndex.value = value % sprites.value.length;

  if (displayIndex.value === 0 && props.delay) {
    pause();
    setTimeout(resume, props.delay);
  }
});

const extractImgElements = (
  element: Element
): (SVGElement | HTMLImageElement)[] => {
  const elements: (SVGElement | HTMLImageElement)[] = [];

  if (element instanceof SVGElement || element instanceof HTMLImageElement) {
    elements.push(element);
  } else if (element.children?.length) {
    for (let i = 0; i < element.children.length; i++) {
      elements.push(...extractImgElements(element.children[i]));
    }
  }

  return elements;
};

watch(
  () => isMounted.value,
  (isMounted) => {
    if (!isMounted) return;
    const slotContent = Array.from(spriteRef.value?.children || []);
    sprites.value = slotContent.flatMap(extractImgElements);
    displayIndex.value = 0;

    // Set initial visibility
    sprites.value.forEach((sprite, index) => {
      sprite.style.display = index === 0 ? "" : "none";
    });
  },
  { immediate: true }
);

// Update visibility whenever displayIndex changes
watch(displayIndex, (newIndex) => {
  sprites.value.forEach((sprite, index) => {
    sprite.style.display = index === newIndex ? "" : "none";
  });
});
</script>

<template>
  <div ref="sprite" class="animated-sprite">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.animated-sprite {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: v-bind(height) !important;
  width: v-bind(width) !important;
  left: v-bind(left);
  top: v-bind(top);
  animation-name: v-bind(animation);
  animation-duration: v-bind(duration);
  animation-delay: v-bind(delay);
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  transform: translate3d(0, 0, 0);
  will-change: transform;

  & > * {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
