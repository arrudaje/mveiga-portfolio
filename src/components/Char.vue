<script lang="ts" setup>
import type { Offset } from '@/types/types';
import { computed } from 'vue';
import { getDuration } from '@/util/utils';

const props = defineProps<{
    height: number,
    width: number,
    offset: Offset,
    run: boolean
}>()

const height = computed(() => `${props.height}px`);
const width = computed(() => `${props.width}px`);
const left = computed(() => `${props.offset.left + props.width / 2}px`);
const top = computed(() => `${props.offset.top + props.height / 2}px`);
const duration = computed(() => `${getDuration(props.run)}ms`);
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
    transition: all v-bind(duration) linear;
}
</style>