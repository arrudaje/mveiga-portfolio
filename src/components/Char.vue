<script lang="ts" setup>
import { computed, ref, watch, useTemplateRef, nextTick } from "vue";
import { getDuration, isMovementAction } from "@/util/utils";
import { useInterval, useMounted, whenever } from "@vueuse/core";
import { Action } from "@/util/enums";
import Bubble from "@/components/Bubble.vue";

type Pose = Exclude<Action, Action.IDLE>;

const props = defineProps<{
  height: number;
  width: number;
  run: boolean;
  action: Action;
  containerRef?: HTMLElement | null;
}>();

const charRef = useTemplateRef("char");

const isMounted = useMounted();

const height = computed(() => `${props.height}px`);
const width = computed(() => `${props.width}px`);
const duration = computed(() => `${getDuration(props.run)}ms`);

const isDialogueOpen = ref(false);

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
      if (isMovementAction(value)) pose.value = value as Pose;
      const slotContent = Array.from(charRef.value?.children || []);
      sprites.value = slotContent.flatMap(extractImgElements);
      displayIndex.value = 0;
    });
  },
  { immediate: true }
);

whenever(isDialogueOpen, () => {
  setTimeout(() => {
    isDialogueOpen.value = false;
  }, 5000);
});
</script>

<template>
  <div ref="char" class="char" @click="isDialogueOpen = true">
    <slot v-if="!isMovementAction(action)" :pose :display-index />
    <slot :name="action" :pose :display-index />

    <Bubble
      v-if="isDialogueOpen"
      anchor="right-start"
      :width="100"
      typewriter-effect
      :container-ref
      :anchor-element="charRef"
      :font-size="20"
      background-color="#E5EEFC"
      border-color="#B7C2D4"
      shadow-color="#27406A"
    >
      Hi!
    </Bubble>
  </div>
</template>

<style lang="scss" setup>
.char {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: v-bind(height);
  width: v-bind(width);
  transition:
    left v-bind(duration) linear,
    top v-bind(duration) linear;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translateX(-20%) translateY(40%) skewX(-15deg);
  }

  & > * {
    height: 85%;
  }
}
</style>
