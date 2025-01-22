<template>
    <Teleport v-if="isVisible" to="body">
      <div 
        class="tooltip" 
        :style="style" 
        @mouseenter="isVisible = true"
        @mouseleave="isVisible = false"
      >
        <slot>
            {{ text }}
        </slot>
      </div>
    </Teleport>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps<{
    text: string;
    targetEl: HTMLElement;
    offset?: { x: number; y: number };
  }>();
  
  const isVisible = ref(false);
  const position = ref({ x: 0, y: 0 });
  
  const style = computed(() => ({
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
  }));
  
  const updatePosition = (event: MouseEvent) => {
    const offset = props.offset || { x: 10, y: -40 };
    position.value = {
      x: event.clientX + offset.x,
      y: event.clientY + offset.y,
    };
  };
  
  const showTooltip = () => {
    isVisible.value = true;
  };
  
  const hideTooltip = () => {
    isVisible.value = false;
  };
  
  onMounted(() => {
    props.targetEl.addEventListener('mouseenter', showTooltip);
    props.targetEl.addEventListener('mouseleave', hideTooltip);
    props.targetEl.addEventListener('mousemove', updatePosition);
  });
  
  onUnmounted(() => {
    props.targetEl.removeEventListener('mouseenter', showTooltip);
    props.targetEl.removeEventListener('mouseleave', hideTooltip);
    props.targetEl.removeEventListener('mousemove', updatePosition);
  });
  </script>
  
  <style scoped>
  .tooltip {
    position: fixed;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    z-index: 9999;
  }
  </style>