<script lang="ts" setup>
import type { Offset } from '@/types/types';
import { computed } from 'vue';

const props = defineProps<{
    height: number,
    width: number,
    offset: Offset
}>()

const height = computed(() => `${props.height}px`);
const width = computed(() => `${props.width}px`);
const left = computed(() => `${props.offset.left - props.width / 2}px`);
const top = computed(() => `${props.offset.top - props.height / 2}px`);
</script>

<template>
    <div class="char"></div>
</template>

<style lang="scss" setup>
.char {
    position: absolute;
    background: white;
    height: v-bind(height);
    width: v-bind(width);
    left: v-bind(left);
    top: v-bind(top);
    transition: all 0.5s linear;
}
</style>