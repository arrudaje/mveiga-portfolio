<script lang="ts" setup>
import Sprite from "@/assets/svg/char-sprites/Sprite.vue";
import Char from "@/components/Char.vue";
import Controls from "@/components/Controls.vue";
import Map from "@/components/Map.vue";
import type { Coordinate, Tile } from "@/types/types";
import { Action } from "@/util/enums";
import { reactive, ref } from "vue";
import map from "@/setup/main.json";

const currentTile = reactive({
  coordinate: { x: 4, y: 5 },
  allow: true,
  hasChar: true,
});
const run = ref(false);
const currentAction = ref<Action>(Action.IDLE);

const charOffset = (tile: number) => ({
  left: currentTile.coordinate.x * tile,
  top: currentTile.coordinate.y * tile,
});

const setNextTile = (
  action: Action,
  next: (coord: Coordinate, action: Action) => Tile | null
) => {
  currentAction.value = action;
  if (currentAction.value === Action.IDLE) return;
  const tile = next(currentTile.coordinate, action);
  if (!tile) return;
  currentTile.coordinate = tile.coordinate;
  currentTile.allow = tile.allow;
  currentTile.hasChar = tile.hasChar;
};
</script>

<template>
  <div class="map-view">
    <!--<Map aspect-ratio="16/9" :columns="36" background="rgba(137, 34, 177, 0.15)">-->
    <Map aspect-ratio="16/9" :columns="36" :map>
      <template #background>
        <image href="@/assets/map.svg"/>
      </template>
      <template #default="{ next, tile }">
        <Char
          :height="tile * 2"
          :width="tile"
          :offset="charOffset(tile)"
          :action="currentAction"
          :run
        >
          <template #[Action.IDLE]="{ pose, displayIndex }">
            <template v-if="pose === Action.DOWN">
              <Sprite v-show="displayIndex === 0" id="idle-down-3" />
              <Sprite v-show="displayIndex === 1" id="idle-down-2" />
            </template>
            <template v-if="pose === Action.UP">
              <Sprite id="idle-up-1" />
            </template>
            <template v-if="pose === Action.LEFT">
              <Sprite id="idle-left-1" />
            </template>
            <template v-if="pose === Action.RIGHT">
              <Sprite id="idle-right-1" />
            </template>
          </template>
          <template #[Action.DOWN]="{ displayIndex }">
            <Sprite v-show="displayIndex === 0" id="walk-down-2" />
            <Sprite v-show="displayIndex === 1" id="idle-down-1" />
            <Sprite v-show="displayIndex === 2" id="walk-down-3" />
            <Sprite v-show="displayIndex === 3" id="idle-down-1" />
          </template>
          <template #[Action.UP]="{ displayIndex }">
            <Sprite v-show="displayIndex === 0" id="walk-up-2" />
            <Sprite v-show="displayIndex === 1" id="idle-up-1" />
            <Sprite v-show="displayIndex === 2" id="walk-up-3" />
            <Sprite v-show="displayIndex === 3" id="idle-up-1" />
          </template>
          <template #[Action.LEFT]="{ displayIndex }">
            <Sprite v-show="displayIndex === 0" id="walk-left-2" />
            <Sprite v-show="displayIndex === 1" id="idle-left-1" />
            <Sprite v-show="displayIndex === 2" id="walk-left-3" />
            <Sprite v-show="displayIndex === 3" id="idle-left-1" />
          </template>
          <template #[Action.RIGHT]="{ displayIndex }">
            <Sprite v-show="displayIndex === 0" id="walk-right-2" />
            <Sprite v-show="displayIndex === 1" id="idle-right-1" />
            <Sprite v-show="displayIndex === 2" id="walk-right-3" />
            <Sprite v-show="displayIndex === 3" id="idle-right-1" />
          </template>
        </Char>
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
  width: 1400px;
  margin: 0 auto;
  background: #000;
}
</style>
