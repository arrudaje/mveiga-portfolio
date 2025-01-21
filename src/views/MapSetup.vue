<script lang="ts" setup>
import Map from '@/components/Map.vue';
</script>

<template>
  <div class="home pixel setup">
    <Map aspect-ratio="16/9" :columns="36" setup class="setup__map">
      <template #background>
        <image href="@/assets/map.svg" />
      </template>
    </Map>
  </div>
</template>

<style lang="scss" scoped>
.setup {
  &__map {
    max-width: 50vw;
  }
}
</style>