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
}>();

const map = ref<Map>(props.map ?? {});
const mapRef = useTemplateRef("map-ref");
const { pressed } = useMousePressed();
const { A } = useMagicKeys();

const width = computed(() => mapRef.value?.getBoundingClientRect().width ?? 0);
const height = computed(() => {
  const [aspectWidth, aspectHeight] = props.aspectRatio.split("/");
  return (width.value * Number(aspectHeight)) / Number(aspectWidth);
});
const tile = computed(() => width.value / props.columns);
const tileHoverColor = computed(
  () => `rgba(${A.value ? "0,0,0" : "255,0,0"}, 0.5)`
);

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
  const tiles = Object.entries(map.value ?? {})
    .filter(([key]) => {
      const [x, y] = key.split(",").map(Number);
      return (
        x >= actualX &&
        x < actualX + size.x &&
        y >= actualY &&
        y < actualY + size.y
      );
    });
  if (!tiles.length || !tiles.every(([_, t]) => t.allow)) return null;
  return tiles.find(([key]) => key === `${actualX},${actualY}`)?.[1] || null;
};

const generate = () => console.log(map.value);

onMounted(() => {
  if (!props.map) {
    const coords: Map = {};
    const columns = width.value / tile.value;
    const rows = height.value / tile.value;

    for (let x = 0; x < columns && width.value >= (x + 1) * tile.value; x++) {
      for (let y = 0; y < rows && height.value >= (y + 1) * tile.value; y++) {
        coords[`${x},${y}`] = {
          coordinate: {
            x,
            y,
          },
          allow: true,
          hasChar: false,
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
      <slot name="background"></slot>
      <rect
        v-for="(t, key) in map"
        :key="key"
        :x="t.coordinate.x * tile"
        :y="t.coordinate.y * tile"
        :height="tile"
        :width="tile"
        class="map__grid__tile"
        :class="{ 'map__grid__tile--disallowed': !t.allow }"
        @mousemove="pressed && (t.allow = A)"
      />
    </svg>
    <slot :next="getNextTile" :tile></slot>
    <template v-if="setup">
      <button @click="generate">Generate</button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 100%;
  display: flex;
  gap: 32px;
  flex-flow: column;
  align-items: center;

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
