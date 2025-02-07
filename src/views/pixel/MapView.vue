<script lang="ts" setup>
import AnimatedSprite from "@/assets/svg/AnimatedSprite.vue";
import InteractibleItem from "@/components/InteractibleItem.vue";
import Sprite from "@/assets/svg/Sprite.vue";
import Char from "@/components/Char.vue";
import Controls from "@/components/Controls.vue";
import Map from "@/components/Map.vue";
import type { Coordinate, Tile } from "@/types/types";
import { Action, Animation } from "@/util/enums";
import { computed, reactive, ref, toRef, useTemplateRef } from "vue";
import map from "@/setup/main.json";
import { isMovementAction } from "@/util/utils";
import Handy1 from "@/assets/svg/handy-1.svg";
import Handy2 from "@/assets/svg/handy-2.svg";

const cursorRegular = computed(() => `url(${Handy1}) 18 2, pointer`);
const cursorClick = computed(() => `url(${Handy2}) 18 2, pointer`);

const currentTile = reactive<Tile>({
  coordinate: { x: 6, y: 7 },
  allow: true,
});
const charPosition = toRef(currentTile, "coordinate");
const charSize = reactive<Coordinate>({ x: 2, y: 3 });
const run = ref(false);
const currentAction = ref<Action>(Action.IDLE);
const mapView = useTemplateRef("mapView");

const charOffset = (tile: number) => ({
  left: charPosition.value.x * tile,
  top: charPosition.value.y * tile,
});

const charCenterOffset = (tile: number) => ({
  left: charPosition.value.x * tile + (charSize.x * tile) / 2,
  top: charPosition.value.y * tile + (charSize.y * tile) / 2,
});

const setNextTile = (
  action: Action,
  next: (coord: Coordinate, action: Action, size: Coordinate) => Tile | null
) => {
  currentAction.value = action;
  if (isMovementAction(action)) {
    const tile = next(charPosition.value, action, charSize);
    if (!tile) return;
    currentTile.coordinate = tile.coordinate;
    currentTile.allow = tile.allow;
  }
};
</script>

<template>
  <div class="map-view" ref="mapView">
    <!--<Map aspect-ratio="16/9" :columns="36" background="rgba(137, 34, 177, 0.15)">-->
    <Map id="map" aspect-ratio="16/9" :columns="50" :map>
      <template #background="{ onLoad }">
        <image href="@/assets/map.svg" @load="onLoad" />
      </template>
      <template #default="{ next, tile }">
        <Controls
          @control-action="(action) => setNextTile(action, next)"
          @control-run="run = true"
          @control-walk="run = false"
        />

        <!-- Chimney smoke -->
        <AnimatedSprite
          :height="80"
          :width="80"
          :offset="{ left: 165, top: 8 }"
          :interval="200"
          :delay="2000"
        >
          <Sprite id="smoke-0" />
          <Sprite id="smoke-1" />
          <Sprite id="smoke-2" />
          <Sprite id="smoke-3" />
          <Sprite id="smoke-4" />
          <Sprite id="smoke-5" />
          <Sprite id="smoke-6" />
        </AnimatedSprite>

        <!-- Koi -->
        <AnimatedSprite
          :height="50"
          :width="50"
          :offset="{ left: 8 * tile, top: 18.5 * tile }"
          :interval="200"
          :interval-animation="5000"
          :delay="2000"
          :animation="Animation.SWIM"
        >
          <Sprite id="koi-left" />
          <Sprite id="koi-right" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 3 * tile, top: 10 * tile }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 21 * tile + 20, top: 12 * tile - 20 }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 21 * tile, top: 12 * tile }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 16 * tile, top: 24 * tile }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 36 * tile, top: 3 * tile }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Lily -->
        <AnimatedSprite
          :height="30"
          :width="30"
          :offset="{ left: 4 * tile, top: 24 * tile }"
          :interval-animation="2000"
          :animation="Animation.FLOAT"
        >
          <Sprite id="lily-1" />
        </AnimatedSprite>

        <!-- Lily -->
        <AnimatedSprite
          :height="60"
          :width="60"
          :offset="{ left: 10 * tile, top: 16 * tile }"
          :interval-animation="2000"
          :animation="Animation.FLOAT"
        >
          <Sprite id="lily-2" />
        </AnimatedSprite>

        <!-- Shine -->
        <AnimatedSprite
          :height="600"
          :width="400"
          :offset="{ left: 24 * tile - 2, top: 5 * tile }"
          :delay="200"
          :interval="1500"
          :animation="Animation.SWING"
          style="opacity: 0.7"
        >
          <Sprite id="river-shine-1" />
        </AnimatedSprite>

        <!-- Notebook -->
        <InteractibleItem
          :height="tile * 2"
          :width="tile * 2"
          :container-ref="mapView"
          :offset="{ left: 15 * tile, top: 10 * tile }"
          :charPosition="charCenterOffset(tile)"
          :interaction-radius="2 * tile"
          :action="currentAction"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Hello, this is a test that should be long enough to see the typewriter effect
          </template>
        </InteractibleItem>

        <!-- Notebook -->
        <InteractibleItem
          :height="tile * 2"
          :width="tile * 2"
          :container-ref="mapView"
          :offset="{ left: 45 * tile, top: 1 * tile }"
          :charPosition="charCenterOffset(tile)"
          :interaction-radius="2 * tile"
          :action="currentAction"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Hello
          </template>
        </InteractibleItem>

        <!-- Notebook -->
        <InteractibleItem
          :height="tile * 2"
          :width="tile * 2"
          :container-ref="mapView"
          :offset="{ left: 36 * tile, top: 17 * tile }"
          :charPosition="charCenterOffset(tile)"
          :interaction-radius="2 * tile"
          :action="currentAction"
          invert
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Hello
          </template>
        </InteractibleItem>

        <!-- Notebook -->
        <InteractibleItem
          :height="tile * 2"
          :width="tile * 2"
          :container-ref="mapView"
          :offset="{ left: 28 * tile, top: 10 * tile }"
          :charPosition="charCenterOffset(tile)"
          :interaction-radius="2 * tile"
          :action="currentAction"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Hello
          </template>
        </InteractibleItem>

        <Char
          :height="tile * charSize.y"
          :width="tile * charSize.x"
          :offset="charOffset(tile)"
          :action="currentAction"
          :run
          class="map-view__char"
        >
          <template #default="{ pose, displayIndex }">
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

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :offset="{ left: 39 * tile, top: 9 * tile }"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Bridge -->
        <AnimatedSprite
          :height="55"
          :width="225"
          :offset="{ left: 654, top: 413.5 }"
          style="clip-path: inset(0 0 50% 0)"
        >
          <Sprite id="bridge" />
        </AnimatedSprite>

        <!-- Theo -->
        <AnimatedSprite
          :height="70"
          :width="70"
          :offset="{ left: 30 * tile, top: 24.5 * tile }"
          :interval-animation="5000"
          :animation="Animation.SPIN"
        >
          <Sprite id="theo" />
        </AnimatedSprite>

        <AnimatedSprite
          :height="335"
          :width="335"
          :offset="{ left: 1100, top: 265 }"
          style="clip-path: inset(0 0 25% -75%)"
        >
          <Sprite id="trees" />
        </AnimatedSprite>
      </template>
    </Map>
  </div>
</template>

<style lang="scss" scoped>
.map-view {
  width: 1400px;
  margin: 0 auto;
  background: #000;
  cursor: v-bind(cursorRegular);

  &:active {
    cursor: v-bind(cursorClick);
  }

  &__char {
    transform: translate3d(0, 0, 0);
    will-change: opacity;
    animation: teleport 2s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
}

@keyframes teleport {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.1;
  }
  35% {
    opacity: 0.5;
  }
  45% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.7;
  }
  70% {
    opacity: 0.2;
  }
  80% {
    opacity: 0.8;
  }
  85% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.9;
  }
  93% {
    opacity: 0.5;
  }
  96% {
    opacity: 0.8;
  }
  98% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
