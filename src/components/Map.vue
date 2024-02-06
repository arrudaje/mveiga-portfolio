<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Map, Coordinate, Position, Tile } from "@/types/types";
import { Action } from "@/util/enums";

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    tile?: number;
    map?: Map;
    setup?: boolean;
  }>(),
  {
    width: 300,
    height: 300,
    tile: 30,
  }
);

const tileRegister = ref<Record<string, Tile>>({});

const actualTile = computed(() => {
  const columns = Math.ceil(props.width / props.tile);
  const rows = Math.ceil(props.height / props.tile);
});
const map = computed(() => {
  if (Object.keys(tileRegister.value).length) return tileRegister.value;

  const coords: Map = {};
  const columns = props.width / props.tile;
  const rows = props.height / props.tile;

  for (let x = 0; x < columns && props.width > ((x + 1) * props.tile); x++) {
    for (let y = 0; y < rows && props.height > ((y + 1) * props.tile); y++) {
      coords[`${x},${y}`] = {
        position: {
          x,
          y,
          left: x * props.tile,
          top: y * props.tile,
        },
        allow: true,
        hasChar: false,
      };
    }
  }

  return coords;
});

const getNextTile = (coord: Coordinate, action: Action): Tile | null => {
  let actualX = coord.x;
  let actualY = coord.y;
  switch (action) {
    case Action.UP:
      actualY--; break;
    case Action.DOWN:
      actualY++; break;
    case Action.LEFT:
      actualX--; break;
    case Action.RIGHT:
      actualX++; break;
  }
  const tile = map.value[`${actualX},${actualY}`];
  if (!tile) return null;
  return tile;
}

const generate = () => {

}
</script>

<template>
  <div class="map">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0"
      :viewBox="`0 0 ${width} ${height}`">
      <slot name="background"></slot>
      <rect v-for="(t, key) in map" :key="key" :x="t?.position.left" :y="t?.position.top" :height="tile"
          :width="tile" />
    </svg>
    <slot :next="getNextTile"></slot>
    <template v-if="setup">
      <button @click="generate">
        Generate
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.map {
  position: relative;

  :slotted(image) {
    width: 100%;
    height: 100%;
  }
}
</style>