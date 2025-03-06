<script lang="ts" setup>
import { computed, useTemplateRef, watch, inject, toRef } from "vue";
import type { Offset } from "@/types/types";
import { Action, Animation } from "@/util/enums";
import Sprite from "@/assets/svg/Sprite.vue";
import Bubble from "@/components/Bubble.vue";
import AnimatedSprite from "@/assets/svg/AnimatedSprite.vue";
import {
  onClickOutside,
  useElementBounding,
  useToggle,
} from "@vueuse/core";
import { event } from "vue-gtag";
import { INTERACTIBLE_ITEM_INTERACT } from "@/util/events";
import { MAP_DIMENSIONS } from "@/util/constants";

const props = withDefaults(
  defineProps<{
    id: string;
    height: number;
    width: number;
    containerRef?: HTMLElement | null;
    interval?: number;
    delay?: number;
    animation?: Animation;
    interactionRadius?: number;
    charPosition: Offset;
    action: Action;
    invert?: boolean;
    absolute?: boolean;
  }>(),
  {
    interval: 1000,
    interactionRadius: 100,
  }
);

const interactiveSpriteContainer = useTemplateRef("interactiveSpriteContainer");
const interactiveSpriteContainerItem = useTemplateRef(
  "interactiveSpriteContainerItem"
);

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

const duration = computed(() => `${props.interval}ms`);
const { left, top } = useElementBounding(interactiveSpriteContainer);
const ARROW_SIZE = 15;
const arrowOffset = computed(() => ({
  left: `${props.width / 2 - ARROW_SIZE / 2}px`,
  top: `-5px`,
}));

const isInRange = computed(() => {
  const distance = Math.sqrt(
    Math.pow(props.charPosition.left - (left.value + props.width / 2), 2) +
      Math.pow(props.charPosition.top - (top.value + props.height / 2), 2)
  );
  return distance - 2 <= props.interactionRadius;
});

const [isDialogueOpen, toggleDialogue] = useToggle(false);

watch(isInRange, (inRange) => inRange || toggleDialogue(false));

watch(
  () => props.action,
  (action) => {
    if (action === Action.INTERACT && isInRange.value) {
      toggleDialogue(true);
      event(INTERACTIBLE_ITEM_INTERACT, {
        event_category: "action",
        event_label: props.id,
      });
    }
  }
);

const handleClick = () => {
  toggleDialogue(true);
  event(INTERACTIBLE_ITEM_INTERACT, {
    event_category: "click",
    event_label: props.id,
  });
};
</script>

<template>
  <div
    :id
    class="interactive-sprite-container"
    ref="interactiveSpriteContainer"
  >
    <div
      ref="interactiveSpriteContainerItem"
      class="interactive-sprite-container__item"
      :class="{ 'interactive-sprite-container__item--inverted': invert }"
      @click="handleClick"
    >
      <slot v-if="!isDialogueOpen" name="off" />
      <slot v-else name="on" />
    </div>

    <template v-if="isInRange">
      <div v-if="!isDialogueOpen" class="interactive-sprite-container__press">
        Press <span class="interactive-sprite-container__press__key">A</span>
      </div>

      <AnimatedSprite
        :height="ARROW_SIZE"
        :width="ARROW_SIZE"
        :animation="Animation.HOVER"
        :style="arrowOffset"
        absolute
      >
        <Sprite id="arrow" />
      </AnimatedSprite>
    </template>

    <Bubble
      v-if="isDialogueOpen"
      anchor="right-start"
      :width="500"
      :anchor-element="interactiveSpriteContainerItem"
      :container-ref
      typewriter-effect
      :font-size="20"
      background-color="#E5EEFC"
      border-color="#B7C2D4"
      shadow-color="#27406A"
      closable
      @close="toggleDialogue(false)"
    >
      <slot name="dialogue" />
    </Bubble>
  </div>
</template>

<style lang="scss" scoped>
.interactive-sprite-container {
  position: absolute;
  left: v-bind(left);
  top: v-bind(top);
  height: v-bind(heightPx);
  width: v-bind(widthPx);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation-name: v-bind(animation);
  animation-duration: v-bind(duration);
  animation-delay: v-bind(delay);
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;

  &__item {
    height: 100%;
    width: 100%;

    &--inverted {
      transform: scale(-1, 1);
    }

    & > * {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &__press {
    position: absolute;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "04b03";
    font-size: 14px;
    color: var(--color-text);
    z-index: 1000;

    &__key {
      margin-left: -3px;
      display: inline-block;
      color: #fff;
      border-radius: 50%;
      width: 17px;
      height: 17px;
      line-height: 19px;
      padding-left: 3px;
      background-color: var(--color-text);
    }
  }
}
</style>
