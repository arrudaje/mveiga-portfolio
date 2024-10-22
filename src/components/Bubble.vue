<script lang="ts" setup>
import { computed } from "vue";

type Anchor = `${"top" | "bottom" | "left" | "right"}-${
  | "start"
  | "center"
  | "end"}`;

const props = withDefaults(
  defineProps<{
    anchor: Anchor;
    width: number;
  }>(),
  {
    width: 100,
  }
);

const anchorPosition = computed(() => props.anchor.split("-")[0]);
const anchorAlign = computed(() => props.anchor.split("-")[1]);
const widthPx = computed(() => props.width + "px");
</script>

<template>
  <div
    class="bubble"
    :class="`bubble--${anchorPosition} bubble--${anchorAlign}`"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$white: #fcf2e6;
$black: #434a54;
$shadow: var(--color-accent);
$px: 2.5px;
$bubble-border: 0 -1 * $px $white, 0 -2 * $px $black, $px 0 $white,
  $px -1 * $px $black, 2 * $px 0 $black, 0 $px $white, 0 2 * $px $black,
  -1 * $px 0 $white, -1 * $px $px $black, -2 * $px 0 $black,
  -1 * $px -1 * $px $black, $px $px $black;

.bubble {
  position: absolute;
  display: inline-block;
  text-align: center;
  font-family: "04b03";
  font-size: 14px;
  line-height: 1.3em;
  background-color: $white;
  color: $black;
  padding: 8px;
  box-shadow: $bubble-border, $px 3 * $px $shadow, 3 * $px $px $shadow,
    2 * $px 2 * $px $shadow;
  box-sizing: border-box;
  width: v-bind(widthPx);

  &::after {
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
    height: $px;
    width: $px;
    box-shadow: 0 $px $black, 0 2 * $px $black, 0 3 * $px $black,
      0 4 * $px $black, -1 * $px 3 * $px $black, -2 * $px 2 * $px $black,
      -3 * $px 1 * $px $black, -1 * $px $px $white, -2 * $px $px $white,
      -1 * $px 2 * $px $white;
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
</style>
