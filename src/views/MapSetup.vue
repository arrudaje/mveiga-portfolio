<script lang="ts" setup>
import Map from '@/components/Map.vue';
</script>

<template>
  <div class="home pixel setup">
    <Map aspect-ratio="3/2" :columns="39" setup class="setup__map">
      <template #background>
        <image href="@/assets/map.png" />
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