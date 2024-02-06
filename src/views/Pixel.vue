<script lang="ts" setup>
import Map from '@/components/Map.vue';
import Controls from '@/components/Controls.vue';
import type { Offset, Coordinate, Position } from '@/types/types';
import { Action } from '@/util/enums';
import { ref } from 'vue';
import Char from '@/components/Char.vue';

const coordinate = ref<Coordinate>({
  x: 0,
  y: 0
});
const offset = ref<Offset>();

const assignCoordinateAndOffset = (position: Position | null) => {
  if (!position) return;
  coordinate.value = {
    x: position.x,
    y: position.y,
  };
  offset.value = {
    left: position.left,
    top: position.top,
  };
};
</script>

<template>
  <div class="home pixel">
    <Map :width="1000" :height="600" :square="30" class="pixel__map">
      <template #default="{ next }">
        <Char v-if="offset" :height="50" :width="30" :offset="offset">
          {{ assignCoordinateAndOffset(next(coordinate, Action.INIT)) }}
          <Controls @control-action="assignCoordinateAndOffset(next(coordinate, $event))" />
        </Char>
      </template>
    </Map>
  </div>
</template>

<style lang="scss" scoped>
.pixel__map {
  max-width: 800px;

  :deep(rect) {
    border: 1px solid white;
  }
}
</style>