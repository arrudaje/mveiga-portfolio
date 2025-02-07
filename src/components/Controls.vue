<script lang="ts" setup>
import { Action } from '@/util/enums';
import { getDuration } from '@/util/utils';
import { useIntervalFn, useMagicKeys } from '@vueuse/core';
import { throttle } from 'lodash';
import { computed, nextTick, ref, watch } from 'vue';

const isRunning = ref(false);
const runDuration = computed(() => getDuration(isRunning.value));

const emit = defineEmits<{
    'control-action': [action: Action]
    'control-run': []
    'control-walk': []
}>();

const handleKeys = (keys: Set<string>) => {
    let emitted = false;

    /* Movement controls */
    if (keys.has('arrowup')) {
        emit('control-action', Action.UP);
        emitted = true;
    } else if (keys.has('arrowdown')) {
        emit('control-action', Action.DOWN);
        emitted = true;
    } else if (keys.has('arrowleft')) {
        emit('control-action', Action.LEFT);
        emitted = true;
    } else if (keys.has('arrowright')) {
        emit('control-action', Action.RIGHT);
        emitted = true;
    }

    /* Speed controls */
    if (keys.has(' ')) {
        isRunning.value = true;
        emit('control-run');
    } else {
        isRunning.value = false;
        emit('control-walk');
    }

    if (!emitted) {
        emit('control-action', Action.IDLE);
    }
}

const handleImmediateKeys = (keys: Set<string>) => {
    if (keys.has('a')) {
        emit('control-action', Action.INTERACT);
    }
}

const { current } = useMagicKeys();
watch(current, handleImmediateKeys);
useIntervalFn(() => handleKeys(current), runDuration);
</script>

<template></template>
