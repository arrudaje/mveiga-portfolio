<script lang="ts" setup>
import type { Offset } from "@/types/types";
import { computed, ref, watch, useTemplateRef, nextTick } from "vue";
import { getDuration } from "@/util/utils";
import { useInterval, useMounted } from "@vueuse/core";
import { Action } from "@/util/enums";

type Pose = Exclude<Action, Action.IDLE>;

const props = defineProps<{
  height: number;
  width: number;
  offset: Offset;
  run: boolean;
  action: Action;
}>();

const charRef = useTemplateRef("char");

const isMounted = useMounted();

const height = computed(() => `${props.height}px`);
const width = computed(() => `${props.width}px`);
const left = computed(() => `${props.offset.left}px`);
const top = computed(() => `${props.offset.top}px`);
const duration = computed(() => `${getDuration(props.run)}ms`);

const pose = ref<Pose>(Action.DOWN);

const sprites = ref<(SVGElement | HTMLImageElement)[]>([]);
const displayIndex = ref(0);

const charInterval = computed(() => {
    let interval = getDuration(props.run) / 2;
    if (props.action === Action.IDLE) {
        interval = getDuration(false);
    }
    return interval;
});

const { counter } = useInterval(charInterval, {
  controls: true,
  immediate: true,
});
watch(counter, (value) => {
  displayIndex.value = value % sprites.value.length;
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
  [() => props.action, () => isMounted.value],
  ([value, isMounted]: [Action, boolean]) => {
    nextTick(() => {
      if (!isMounted) return;
      if (value !== Action.IDLE) pose.value = value;
      const slotContent = Array.from(charRef.value?.children || []);
      sprites.value = slotContent.flatMap(extractImgElements);
      displayIndex.value = 0;
    });
  },
  { immediate: true }
);
</script>

<template>
  <div ref="char" class="char">
    <slot :name="action" :pose :display-index />
  </div>
</template>

<style lang="scss" setup>
.char {
  position: absolute;
  display: flex;
  align-items: baseline;
  justify-content: center;
  height: v-bind(height);
  width: v-bind(width);
  left: v-bind(left);
  top: v-bind(top);
  transition: left v-bind(duration) linear, top v-bind(duration) linear;

  &:before {
    content: "";
    position: absolute;
    bottom: 10%;
    width: 100%;
    height: 10%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translateX(-20%) translateY(40%) skewX(-15deg);
  }

  & > * {
    height: 90%;
  }
}
</style>
