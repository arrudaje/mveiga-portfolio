<script lang="ts" setup>
import Char from "@/components/Char.vue";
import Controls from "@/components/Controls.vue";
import Map from "@/components/Map.vue";
import type { Coordinate, Tile } from "@/types/types";
import type { Action } from "@/util/enums";
import { computed, ref } from "vue";

const currentTile = ref<Tile>({
  coordinate: { x: 0, y: 0 },
  allow: true,
  hasChar: true,
});
const run = ref(false);

const setNextTile = (
  action: Action,
  next: (coord: Coordinate, action: Action) => Tile | null
) => {
  const tile = next(currentTile.value.coordinate, action);
  if (!tile) return;
  currentTile.value = tile;
};
</script>

<template>
  <div class="map-view">
    <Map aspect-ratio="1/1" :columns="10">
      <template #default="{ next, tile }">
        <Char
          :height="tile / 2"
          :width="tile / 2"
          :offset="{
            left: currentTile.coordinate.x * tile,
            top: currentTile.coordinate.y * tile,
          }"
          :run="run"
        />
        <Controls
          @control-action="setNextTile($event, next)"
          @control-run="run = true"
          @control-walk="run = false"
        />
      </template>
    </Map>
  </div>
</template>

<style lang="scss" scoped>
.map-view {
  width: 500px;
  margin: 0 auto;
  background: #000;
}
</style>
