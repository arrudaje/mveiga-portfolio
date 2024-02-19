<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { Map, Coordinate, Tile, MapSetup } from "@/types/types";
import { Action } from "@/util/enums";
import { useMagicKeys, useMousePressed } from "@vueuse/core";

const props = defineProps<{
  aspectRatio: `${number}/${number}`;
  columns: number;
  map?: MapSetup;
  setup?: boolean;
}>();

const map = ref<Map>();
const mapRef = ref<SVGAElement>();
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

const getNextTile = (coord: Coordinate, action: Action): Tile | null => {
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
  const tile = map.value[`${actualX},${actualY}`];
  if (!tile) return null;
  return tile;
};

const generate = () => console.log(map.value);

onMounted(() => {
  if (props.map) map.value = Object.fromEntries(Object.entries(props.map).map(([key, value]) => {
    const tile: Tile = { ...value };

    return [key, value];
  }));
  else {
    const coords: Map = {};
    const columns = width.value / tile.value;
    const rows = height.value / tile.value;

    for (
      let x = 0;
      x < columns && width.value >= (x + 1) * tile.value;
      x++
    ) {
      for (
        let y = 0;
        y < rows && height.value >= (y + 1) * tile.value;
        y++
      ) {
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
      ref="mapRef"
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
        :x="t.position.left"
        :y="t.position.top"
        :height="tile"
        :width="tile"
        class="map__grid__tile"
        :class="{ 'map__grid__tile--disallowed': !t.allow }"
        @mousemove="pressed && (t.allow = A)"
      />
    </svg>
    <slot :next="getNextTile"></slot>
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
          fill: rgba(0, 0, 0, 0.2);
          stroke: white;

          &--disallowed {
            fill: rgba(red, 0.2);
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
