<template>
  <svg :height :width shape-rendering="crispEdges" style="image-rendering: pixelated;">
    <use :href="`#${id}`" />
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  height?: number | string;
  width?: number | string;
}>();
</script>
