<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";

type Anchor = `${"top" | "bottom" | "left" | "right"}-${
  | "start"
  | "center"
  | "end"}`;

const props = withDefaults(
  defineProps<{
    anchor: Anchor;
    width: number;
    height?: number;
    containerRef?: HTMLElement | null;
    withTail?: boolean;
    inner?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    shadowColor?: string;
    fontSize?: number;
    typewriterEffect?: boolean;
    typewriterSpeed?: number;
  }>(),
  {
    width: 100,
    withTail: true,
    backgroundColor: "#fcf2e6",
    borderColor: "#434a54",
    shadowColor: "#aabdd8",
    fontSize: 14,
    typewriterEffect: false,
    typewriterSpeed: 50,
  }
);

const emit = defineEmits(["typewriter-finished"]);

const bubble = useTemplateRef("bubble");

const widthPx = computed(() => props.width + "px");
const heightPx = computed(() => (props.height ? props.height + "px" : "auto"));
const fontSizePx = computed(() => props.fontSize + "px");

const slotContent = useTemplateRef("slotContent");
const characterCount = computed(() => {
  if (slotContent.value) {
    return slotContent.value.textContent?.trim().length || 0;
  }
  return 0;
});
const typewriterDelay = computed(() => `${props.typewriterSpeed}ms`);

const finalContainerRef = props.containerRef ?? document.body;

const adjustedAnchor = computed(() => {
  if (!bubble.value || !finalContainerRef) return props.anchor;

  const bubbleRect = bubble.value.getBoundingClientRect();
  const containerRect = finalContainerRef.getBoundingClientRect();
  const [position, alignment] = props.anchor.split("-");

  let newPosition = position;
  let newAlignment = alignment;

  // Check for vertical overflow
  if (position === "top") {
    const topOverflow = containerRect.top > bubbleRect.top;
    if (topOverflow) newPosition = "bottom";
  } else if (position === "bottom") {
    const bottomOverflow = containerRect.bottom < bubbleRect.bottom;
    if (bottomOverflow) newPosition = "top";
  }

  // Check for horizontal overflow
  if (position === "left") {
    const leftOverflow = containerRect.left > bubbleRect.left;
    if (leftOverflow) newPosition = "right";
  } else if (position === "right") {
    const rightOverflow = containerRect.right < bubbleRect.right;
    if (rightOverflow) newPosition = "left";
  }

  // Check alignment overflow
  if (newPosition === "top" || newPosition === "bottom") {
    if (alignment === "start" && bubbleRect.left < containerRect.left) {
      newAlignment = "end";
    } else if (alignment === "end" && bubbleRect.right > containerRect.right) {
      newAlignment = "start";
    }
  } else {
    if (alignment === "start" && bubbleRect.top < containerRect.top) {
      newAlignment = "end";
    } else if (
      alignment === "end" &&
      bubbleRect.bottom > containerRect.bottom
    ) {
      newAlignment = "start";
    }
  }

  return `${newPosition}-${newAlignment}` as Anchor;
});

const anchorPosition = computed(() => adjustedAnchor.value.split("-")[0]);
const anchorAlign = computed(() => adjustedAnchor.value.split("-")[1]);

</script>

<template>
  <div
    ref="bubble"
    class="bubble"
    :class="[
      `bubble--${anchorPosition}`,
      `bubble--${anchorAlign}`,
      { 'bubble--with-tail': withTail },
      { 'bubble--typewriter': typewriterEffect },
    ]"
  >
    <span ref="slotContent" class="bubble__content">
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
$white: v-bind(backgroundColor);
$black: v-bind(borderColor);
$shadow: v-bind(shadowColor);
$text: #434a54;
$px: 2.5px;
$bubble-border:
  0 -1 * $px $white,
  0 -2 * $px $black,
  $px 0 $white,
  $px -1 * $px $black,
  2 * $px 0 $black,
  0 $px $white,
  0 2 * $px $black,
  -1 * $px 0 $white,
  -1 * $px $px $black,
  -2 * $px 0 $black,
  -1 * $px -1 * $px $black,
  $px $px $black;

.bubble {
  position: absolute;
  display: inline-block;
  text-align: center;
  font-family: "04b03";
  font-size: v-bind(fontSizePx);
  line-height: 1.3em;
  background-color: $white;
  color: $text;
  padding: 8px;
  box-shadow:
    $bubble-border,
    $px 3 * $px $shadow,
    3 * $px $px $shadow,
    2 * $px 2 * $px $shadow;
  box-sizing: border-box;
  width: v-bind(widthPx) !important;
  height: v-bind(heightPx) !important;
  z-index: 1000;

  &__content {
    width: 100%;
  }

  &--typewriter {
    text-transform: uppercase;

    .bubble__content {
      color: #0000;
      background:
        linear-gradient(-90deg, $text 0, #0000 0) 10px 0,
        linear-gradient($text 0 0) 0 0;
      background-size: calc(v-bind(characterCount) * 1ch) 100%;
      background-clip: padding-box, text;
      background-repeat: no-repeat;
      animation: t calc(v-bind(characterCount) * v-bind(typewriterDelay))
        steps(v-bind(characterCount)) forwards;
    }
  }

  &--with-tail {
    &::after {
      content: "";
      display: block;
      position: absolute;
      box-sizing: border-box;
      height: $px;
      width: $px;
      box-shadow:
        0 $px $black,
        0 2 * $px $black,
        0 3 * $px $black,
        0 4 * $px $black,
        -1 * $px 3 * $px $black,
        -2 * $px 2 * $px $black,
        -3 * $px 1 * $px $black,
        -1 * $px $px $white,
        -2 * $px $px $white,
        -1 * $px 2 * $px $white;
    }
  }

  &--top {
    $bubble-transform: translateY(calc(-100% - 2 * $px));
    top: 0;
    transform: $bubble-transform;

    &::after {
      bottom: -1 * $px;
    }

    &.bubble--start {
      left: 0;
      transform: $bubble-transform translateX(calc(-100% + $px));

      &::after {
        left: calc(100% - $px);
      }
    }

    &.bubble--center {
      left: 50%;
      transform: $bubble-transform translateX(-50%);

      &::after {
        left: 50%;
      }
    }

    &.bubble--end {
      right: 0;
      transform: $bubble-transform translateX(calc(100% - $px));

      &::after {
        left: $px;
        transform: scaleX(-1);
      }
    }
  }

  &--bottom {
    $bubble-transform: translateY(calc(100% + 2 * $px));
    $anchor-transform: scaleY(-1);
    bottom: 0;
    transform: $bubble-transform;

    &::after {
      top: -1 * $px;
      transform: $anchor-transform;
    }

    &.bubble--start {
      left: 0;
      transform: $bubble-transform translateX(calc(-100% + $px));

      &::after {
        left: calc(100% - $px);
      }
    }

    &.bubble--center {
      left: 50%;
      transform: $bubble-transform translateX(-50%);

      &::after {
        left: 50%;
      }
    }

    &.bubble--end {
      right: 0;
      transform: $bubble-transform translateX(calc(100% - $px));

      &::after {
        left: $px;
        transform: $anchor-transform scaleX(-1);
      }
    }
  }

  &--left {
    $bubble-transform: translateX(calc(-100% - 2 * $px));
    $anchor-transform: rotate(-90deg) scaleX(-1);
    left: 0;
    transform: $bubble-transform;

    &::after {
      right: -1 * $px;
      transform: $anchor-transform;
    }

    &.bubble--start {
      top: 0;
      transform: $bubble-transform translateY(calc(-100% + $px));

      &::after {
        top: calc(100% - $px);
      }
    }

    &.bubble--center {
      top: 50%;
      transform: $bubble-transform translateY(-50%);

      &::after {
        bottom: 50%;
        transform: $anchor-transform scaleX(-1);
      }
    }

    &.bubble--end {
      bottom: 0;
      transform: $bubble-transform translateY(calc(100% - $px));

      &::after {
        top: $px;
        transform: $anchor-transform scaleX(-1);
      }
    }
  }

  &--right {
    $bubble-transform: translateX(calc(100% + 2 * $px));
    $anchor-transform: rotate(90deg);
    right: 0;
    transform: $bubble-transform;

    &::after {
      left: -1 * $px;
      transform: $anchor-transform;
    }

    &.bubble--start {
      top: 0;
      transform: $bubble-transform translateY(calc(-100% + $px));

      &::after {
        top: calc(100% - $px);
      }
    }

    &.bubble--center {
      top: 50%;
      transform: $bubble-transform translateY(-50%);

      &::after {
        bottom: 50%;
        transform: $anchor-transform scaleX(-1);
      }
    }

    &.bubble--end {
      bottom: 0;
      transform: $bubble-transform translateY(calc(100% - $px));

      &::after {
        top: $px;
        transform: $anchor-transform scaleX(-1);
      }
    }
  }
}

@keyframes t {
  from {
    background-size: 0 100%;
  }
}
</style>
