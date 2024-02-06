<script lang="ts" setup>
import Map from '@/components/Map.vue';
import Controls from '@/components/Controls.vue';
import type { Offset, Coordinate, Position } from '@/types/types';
import { Action } from '@/util/enums';
import { ref } from 'vue';
import Char from '@/components/Char.vue';


</script>

<template>
  <div class="home pixel setup">
    <Map :width="975" :height="650" :square="30" setup class="setup__map">
      <template #background>
        <!-- <image href="@/assets/map.png" /> -->
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