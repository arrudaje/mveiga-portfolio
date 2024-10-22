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

const { current } = useMagicKeys();
useIntervalFn(() => {
    /* Movement controls */
    if (current.has('arrowup')) {
        emit('control-action', Action.UP);
    } else if (current.has('arrowdown')) {
        emit('control-action', Action.DOWN);
    } else if (current.has('arrowleft')) {
        emit('control-action', Action.LEFT);
    } else if (current.has('arrowright')) {
        emit('control-action', Action.RIGHT);
    }

    /* Speed controls */
    if (current.has('shift')) {
        isRunning.value = true;
        emit('control-run');
    } else {
        isRunning.value = false;
        emit('control-walk');
    }
}, runDuration);
</script>
