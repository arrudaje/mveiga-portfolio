<script lang="ts" setup>
import { Action } from "@/util/enums";
import { getDuration } from "@/util/utils";
import { useIntervalFn, useMagicKeys } from "@vueuse/core";
import { computed, ref, watch } from "vue";

const isRunning = ref(false);
const runDuration = computed(() => getDuration(isRunning.value));

const emit = defineEmits<{
  "control-action": [action: Action];
  "control-run": [];
  "control-walk": [];
}>();

const handleKeys = (keys: Set<string>) => {
  let emitted = false;

  /* Movement controls */
  if (keys.has("arrowup")) {
    emit("control-action", Action.UP);
    emitted = true;
  } else if (keys.has("arrowdown")) {
    emit("control-action", Action.DOWN);
    emitted = true;
  } else if (keys.has("arrowleft")) {
    emit("control-action", Action.LEFT);
    emitted = true;
  } else if (keys.has("arrowright")) {
    emit("control-action", Action.RIGHT);
    emitted = true;
  }

  /* Speed controls */
  if (keys.has(" ")) {
    isRunning.value = true;
    emit("control-run");
  } else {
    isRunning.value = false;
    emit("control-walk");
  }

  if (!emitted) {
    emit("control-action", Action.IDLE);
  }
};

const handleImmediateKeys = (keys: Set<string>) => {
  if (keys.has("a")) {
    emit("control-action", Action.INTERACT);
  }
};

const { current } = useMagicKeys();
watch(current, handleImmediateKeys);
useIntervalFn(() => handleKeys(current), runDuration);
</script>

<template>
  <div class="controls">
    <div class="controls__group">
      <div class="controls__key-container">
        <div class="controls__key">↑</div>
        <div class="controls__key-row">
          <div class="controls__key">←</div>
          <div class="controls__key">↓</div>
          <div class="controls__key">→</div>
        </div>
      </div>
      <span class="controls__label">Movement</span>
    </div>

    <div class="controls__group">
      <div class="controls__key controls__key--wide">Space</div>
      <span class="controls__label">Hold to run</span>
    </div>

    <div class="controls__group">
      <div class="controls__key">A</div>
      <span class="controls__label">Interact</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  position: absolute;
  font-family: "04b03";
  display: flex;
  align-items: flex-end;
  gap: 24px;
  pointer-events: none;
  padding: 24px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 40%,
    rgba(255, 255, 255, 0.4) 100%
  );
  border-radius: 12px;

  &__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  &__key {
    width: 28px;
    height: 28px;
    background: #e4e5e9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c3e50;
    font-size: 12px;
    font-weight: bold;
    position: relative;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 -2px 0 rgba(0, 0, 0, 0.15);
    transform: translateY(0);
    transition: all 0.1s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 3px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      pointer-events: none;
    }

    &--wide {
      width: 70px;
    }

    &:active {
      transform: translateY(2px);
      box-shadow: 
        0 0 2px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 -1px 0 rgba(0, 0, 0, 0.15);
      background: #d8d9dd;
    }
  }

  &__label {
    color: #2c3e50;
    font-size: 12px;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  &__key-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  &__key-row {
    display: flex;
    gap: 3px;
  }
}
</style>
