<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from "vue";
import type { Offset } from "@/types/types";
import { Action, Animation } from "@/util/enums";
import Sprite from "@/assets/svg/Sprite.vue";
import Bubble from "@/components/Bubble.vue";
import AnimatedSprite from "@/assets/svg/AnimatedSprite.vue";
import { onClickOutside } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    height: number;
    width: number;
    containerRef?: HTMLElement | null;
    offset: Offset;
    interval?: number;
    delay?: number;
    animation?: Animation;
    interactionRadius?: number;
    charPosition: Offset;
    action: Action;
    invert?: boolean;
  }>(),
  {
    interval: 1000,
    interactionRadius: 100,
  }
);

const heightPx = computed(() => `${props.height}px`);
const widthPx = computed(() => `${props.width}px`);
const left = computed(() => `${props.offset.left}px`);
const top = computed(() => `${props.offset.top}px`);
const duration = computed(() => `${props.interval}ms`);
const ARROW_SIZE = 15;

const isInRange = computed(() => {
  const distance = Math.sqrt(
    Math.pow(
      props.charPosition.left - (props.offset.left + props.width / 2),
      2
    ) +
      Math.pow(
        props.charPosition.top - (props.offset.top + props.height / 2),
        2
      )
  );
  console.log(distance);
  return distance - 2 <= props.interactionRadius;
});

const isDialogueOpen = ref(false);

watch(isInRange, (inRange) => {
  if (!inRange && isDialogueOpen.value) {
    isDialogueOpen.value = false;
  }
});

watch(
  () => props.action,
  (action) => {
    if (action === Action.INTERACT && isInRange.value) {
      isDialogueOpen.value = true;
    }
  }
);

const handleClick = () => {
  isDialogueOpen.value = true;
};

const interactiveSpriteContainer = useTemplateRef("interactiveSpriteContainer");
onClickOutside(interactiveSpriteContainer, () => {
  isDialogueOpen.value = false;
});
</script>

<template>
  <div class="interactive-sprite-container" ref="interactiveSpriteContainer">
    <div
      class="interactive-sprite-container__item"
      :class="{ 'interactive-sprite-container__item--inverted': invert }"
      @click="handleClick"
    >
      <slot v-if="!isDialogueOpen" name="off" />
      <slot v-else name="on" />
    </div>

    <AnimatedSprite
      v-if="isInRange"
      :height="ARROW_SIZE"
      :width="ARROW_SIZE"
      :offset="{ left: width / 2 - ARROW_SIZE / 2, top: -20 }"
      :animation="Animation.HOVER"
    >
      <Sprite id="arrow" />
    </AnimatedSprite>

    <Bubble
      v-if="isDialogueOpen"
      anchor="right-start"
      :width="500"
      :height="100"
      :container-ref
      typewriter-effect
      :font-size="20"
      background-color="#E5EEFC"
      border-color="#B7C2D4"
      shadow-color="#27406A"
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
}

.speech-card {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
