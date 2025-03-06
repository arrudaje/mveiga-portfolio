<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from "vue";
import type { Map, Coordinate, Tile } from "@/types/types";
import { Action } from "@/util/enums";
import { useMagicKeys, useMousePressed } from "@vueuse/core";

const props = defineProps<{
  aspectRatio: `${number}/${number}`;
  columns: number;
  map?: Map;
  setup?: boolean;
  background?: string;
  width: number;
}>();

const backgroundLoaded = ref(false);

const map = ref<Map>(props.map ?? {});
const { pressed } = useMousePressed();
const { A } = useMagicKeys();

const height = computed(() => {
  const [aspectWidth, aspectHeight] = props.aspectRatio.split("/");
  return (props.width * Number(aspectHeight)) / Number(aspectWidth);
});
const tile = computed(() => props.width / props.columns);
const tileHoverColor = computed(
  () => `rgba(${A.value ? "0,0,0" : "255,0,0"}, 0.5)`
);
const mapWidthPx = computed(() => `${props.width}px`);

const getNextTile = (
  coord: Coordinate,
  action: Action,
  size: Coordinate
): Tile | null => {
  let actualX = coord.x;
  let actualY = coord.y;
  switch (action) {
    case Action.UP:
      actualY--;
      break;
    case Action.DOWN:
      actualY++;
      break;
    case Action.LEFT:
      actualX--;
      break;
    case Action.RIGHT:
      actualX++;
      break;
  }
  const tiles = Object.entries(map.value ?? {}).filter(([key]) => {
    const [x, y] = key.split(",").map(Number);
    return (
      x >= actualX &&
      x < actualX + size.x &&
      y >= actualY &&
      y < actualY + size.y
    );
  });
  const bottomTiles = tiles.filter(([key]) => {
    const [_, y] = key.split(",").map(Number);
    return y === actualY + size.y - 1;
  });
  if (!bottomTiles.length || !bottomTiles.every(([_, t]) => t.allow))
    return null;

  return tiles.find(([key]) => key === `${actualX},${actualY}`)?.[1] || null;
};

const generate = () => console.log(map.value);

const onBackgroundLoad = () => {
  backgroundLoaded.value = true;
};

onMounted(() => {
  if (!props.map) {
    const coords: Map = {};
    const columns = props.width / tile.value;
    const rows = height.value / tile.value;

    for (let x = 0; x < columns && props.width >= (x + 1) * tile.value; x++) {
      for (let y = 0; y < rows && height.value >= (y + 1) * tile.value; y++) {
        coords[`${x},${y}`] = {
          coordinate: {
            x,
            y,
          },
          allow: true,
        };
      }
    }

    map.value = coords;
  }
});
</script>

<template>
  <div class="map" :class="{ 'map--setup': setup }">
    <svg
      ref="map-ref"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0"
      y="0"
      :viewBox="`0 0 ${width} ${height}`"
      class="map__grid"
    >
      <slot name="background" @load="onBackgroundLoad"></slot>
      <rect
        v-for="(t, key) in map"
        :tileX="t.coordinate.x"
        :tileY="t.coordinate.y"
        :key="key"
        :x="t.coordinate.x * tile"
        :y="t.coordinate.y * tile"
        :height="tile"
        :width="tile"
        class="map__grid__tile"
        :class="{
          'map__grid__tile--disallowed': !t.allow,
        }"
        @mousemove="setup && pressed && (t.allow = A)"
      />
    </svg>
    <slot v-if="backgroundLoaded" :next="getNextTile" :tile></slot>
    <button v-if="setup" @click="generate">Generate</button>
  </div>
</template>

<style lang="scss" scoped>
.map {
  position: relative;
  width: v-bind(mapWidthPx);
  display: flex;
  gap: 32px;
  flex-flow: column;
  align-items: center;
  background: #000;

  &__grid {
    position: relative;
    background-color: v-bind(background);
    aspect-ratio: v-bind(aspectRatio);

    &__tile {
      fill: transparent;
      stroke: none;
    }
  }

  &--setup {
    .map {
      &__grid {
        &__tile {
          fill: rgba(0, 0, 0, 0.4);
          stroke: white;

          &--disallowed {
            fill: rgba(red, 0.4);
          }

          &:hover {
            fill: v-bind(tileHoverColor);
          }
        }
      }
    }
  }

  :slotted(image) {
    width: 100%;
  }
}
</style>
