<script lang="ts" setup>
import { computed, ref, watch, useTemplateRef, inject, toRef } from "vue";
import { useInterval, useMounted } from "@vueuse/core";
import { Animation } from "@/util/enums";
import { MAP_DIMENSIONS } from "@/util/constants";

const props = withDefaults(
  defineProps<{
    height: number;
    width: number;
    interval?: number;
    intervalAnimation?: number;
    delay?: number;
    animation?: Animation;
    absolute?: boolean;
  }>(),
  {
    interval: 1000,
  }
);

const spriteRef = useTemplateRef("sprite");
const isMounted = useMounted();
const { width: mapWidth, height: mapHeight } = inject(MAP_DIMENSIONS, {
  width: 0,
  height: 0,
});

const heightPx = computed(() => {
  if (mapHeight === 0 || props.absolute) return `${props.height}px`;
  return `${(props.height / mapHeight) * 100}%`;
});
const widthPx = computed(() => {
  if (mapWidth === 0 || props.absolute) return `${props.width}px`;
  return `${(props.width / mapWidth) * 100}%`;
});
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
  height: v-bind(heightPx) !important;
  width: v-bind(widthPx) !important;
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
