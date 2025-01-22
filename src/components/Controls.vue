<script lang="ts" setup>
import { Action } from '@/util/enums';
import { getDuration } from '@/util/utils';
import { useIntervalFn, useMagicKeys } from '@vueuse/core';
import { computed, ref } from 'vue';

const isRunning = ref(false);
const runDuration = computed(() => getDuration(isRunning.value));

const emit = defineEmits<{
    'control-action': [action: Action]
    'control-run': []
    'control-walk': []
}>();

const handleKeys = (keys: Set<string>, multiple: boolean = false) => {
    /* Movement controls */
    if (keys.has('arrowup')) {
        emit('control-action', Action.UP);
    } else if (keys.has('arrowdown')) {
        emit('control-action', Action.DOWN);
    } else if (keys.has('arrowleft')) {
        emit('control-action', Action.LEFT);
    } else if (keys.has('arrowright')) {
        emit('control-action', Action.RIGHT);
    } else {
        emit('control-action', Action.IDLE);
    }

    /* Speed controls */
    if (keys.has('shift')) {
        isRunning.value = true;
        emit('control-run');
    } else {
        isRunning.value = false;
        emit('control-walk');
    }
}

const { current } = useMagicKeys();
useIntervalFn(() => handleKeys(current), runDuration);
</script>

<template></template>