<script lang="ts" setup>
import { Action } from '@/util/enums';
import { onKeyStroke } from '@vueuse/core';

const emits = defineEmits<{
    'control-action': [action: Action]
}>();

onKeyStroke('ArrowUp', (e: KeyboardEvent) => {
    e.preventDefault();
    emits('control-action', Action.UP);
});

onKeyStroke('ArrowDown', (e: KeyboardEvent) => {
    e.preventDefault();
    emits('control-action', Action.DOWN);
});

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
    e.preventDefault();
    emits('control-action', Action.LEFT);
});

onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
    e.preventDefault();
    emits('control-action', Action.RIGHT);
});
</script>