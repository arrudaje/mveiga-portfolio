<script lang="ts" setup>
import AnimatedSprite from "@/assets/svg/AnimatedSprite.vue";
import InteractibleItem from "@/components/InteractibleItem.vue";
import Sprite from "@/assets/svg/Sprite.vue";
import Char from "@/components/Char.vue";
import Controls from "@/components/Controls.vue";
import Map from "@/components/Map.vue";
import type { Coordinate, Tile } from "@/types/types";
import { Action, Animation } from "@/util/enums";
import { computed, provide, reactive, ref, toRef, useTemplateRef } from "vue";
import map from "@/setup/main.json";
import { isMovementAction } from "@/util/utils";
import ActionButton from "@/components/ActionButton.vue";
import { useElementBounding, useFullscreen } from "@vueuse/core";
import { MAP_DIMENSIONS } from "@/util/constants";

const currentTile = reactive<Tile>({
  coordinate: { x: 6, y: 6 },
  allow: true,
});
const charPosition = toRef(currentTile, "coordinate");
const charSize = reactive<Coordinate>({ x: 2, y: 3 });
const run = ref(false);
const currentAction = ref<Action>(Action.IDLE);
const mapView = useTemplateRef("mapView");
const char = useTemplateRef("char");
const { left, top, width } = useElementBounding(mapView);
const { left: charLeft, top: charTop } = useElementBounding(char);
const MAP_WIDTH = 1400;
const COLUMNS = 50;
const tileSize = computed(() => width.value / COLUMNS);
const MAP_ASPECT_RATIO = "16/9";
const mapHeight = computed(() => {
  const [aspectWidth, aspectHeight] = MAP_ASPECT_RATIO.split("/");
  return (MAP_WIDTH * Number(aspectHeight)) / Number(aspectWidth);
});

const charOffset = computed(() => ({
  left: charPosition.value.x * tileSize.value,
  top: charPosition.value.y * tileSize.value,
}));

const charScreenOffset = computed(() => ({
  left: charLeft.value,
  top: charTop.value,
}));

const charSizePx = computed(() => ({
  width: charSize.x * tileSize.value,
  height: charSize.y * tileSize.value,
}));

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

// const fullscreenButton = useTemplateRef("fullscreenButton");
// const { isFullscreen, toggle } = useFullscreen(mapView);

// const toggleFullscreen = () => {
//   toggle();
//   fullscreenButton.value?.blur();
// };

// const fullscreenAltText = computed(() =>
//   isFullscreen.value ? "Exit fullscreen" : "Enter fullscreen"
// );

provide("isMapView", true);
provide(MAP_DIMENSIONS, { width: MAP_WIDTH, height: mapHeight.value });
</script>

<template>
  <div class="map-view" ref="mapView">
    <!--<Map aspect-ratio="16/9" :columns="36" background="rgba(137, 34, 177, 0.15)">-->
    <Map
      id="map"
      :aspect-ratio="MAP_ASPECT_RATIO"
      :width="MAP_WIDTH"
      :columns="COLUMNS"
      :map
      class="map-view__map"
    >
      <template #init>
        <div class="map-view__init">
            <strong>Rule:</strong> Turn the notebooks on to access the Case Studies
        </div>
      </template>
      <template #background="{ onLoad }">
        <image href="@/assets/map.svg" @load="onLoad" />
      </template>
      <template #default="{ next }">
        <!-- <button
          ref="fullscreenButton"
          class="map-view__fullscreen-btn"
          @click="toggleFullscreen"
          :title="fullscreenAltText"
        >
          <Sprite
            :id="isFullscreen ? 'collapse' : 'expand'"
            width="16"
            height="16"
            class="map-view__fullscreen-btn__icon"
          />
        </button> -->

        <Controls
          @control-action="(action) => setNextTile(action, next)"
          @control-run="run = true"
          @control-walk="run = false"
          class="map-view__controls"
        />

        <!-- Chimney smoke -->
        <AnimatedSprite
          :height="80"
          :width="80"
          :interval="200"
          :style="{
            left: '11.7%',
            top: '1.2%',
          }"
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
          :interval="200"
          :interval-animation="5000"
          :animation="Animation.SWIM"
          :style="{
            left: '16%',
            top: '66%',
          }"
        >
          <Sprite id="koi-left" />
          <Sprite id="koi-right" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '6%',
            top: '35%',
          }"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '43.4%',
            top: '39%',
          }"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '42%',
            top: '41%',
          }"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '34%',
            top: '71.1%',
          }"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Butterfly -->
        <AnimatedSprite
          :height="15"
          :width="15"
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '72%',
            top: '10.6%',
          }"
        >
          <Sprite id="butterfly-yellow-up" />
          <Sprite id="butterfly-yellow-down" />
        </AnimatedSprite>

        <!-- Lily -->
        <AnimatedSprite
          :height="30"
          :width="30"
          :interval-animation="2000"
          :animation="Animation.FLOAT"
          :style="{
            left: '8%',
            top: '85%',
          }"
        >
          <Sprite id="lily-1" />
        </AnimatedSprite>

        <!-- Lily -->
        <AnimatedSprite
          :height="60"
          :width="60"
          :interval-animation="2000"
          :animation="Animation.FLOAT"
          :style="{
            left: '20%',
            top: '57%',
          }"
        >
          <Sprite id="lily-2" />
        </AnimatedSprite>

        <!-- Shine -->
        <AnimatedSprite
          :height="600"
          :width="400"
          :delay="200"
          :interval="1500"
          :animation="Animation.SWING"
          style="opacity: 0.7"
          :style="{
            left: '47.85%',
            top: '17.79%',
          }"
        >
          <Sprite id="river-shine-1" />
        </AnimatedSprite>

        <!-- Notebook Ellen Van Dijk -->
        <InteractibleItem
          id="ellen-van-dijk"
          :height="tileSize * 2"
          :width="tileSize * 2"
          :container-ref="mapView"
          :char-position="charScreenOffset"
          :character-size="charSizePx"
          :action="currentAction"
          :style="{
            left: '90%',
            top: '4%',
          }"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            An E-commerce for an Artist
            <br />
            <ActionButton
              href="https://medium.com/@mveigaj.ortiz/project-2-an-e-commerce-for-an-artist-3c4a151ac94d?source=your_stories_page-------------------------------------"
              class="map-view__action-button"
            >
              Project page
            </ActionButton>
          </template>
        </InteractibleItem>

        <!-- Notebook Too Good To Go -->
        <InteractibleItem
          id="too-good-to-go"
          :height="tileSize * 2"
          :width="tileSize * 2"
          :container-ref="mapView"
          :char-position="charScreenOffset"
          :character-size="charSizePx"
          :action="currentAction"
          invert
          :style="{
            left: '72%',
            top: '59%',
          }"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Working with Heuristics: Too Good To Go Refactoring
            <br />
            <ActionButton
              href="https://medium.com/@mveigaj.ortiz/working-with-heuristics-too-good-to-go-refactoring-8e947b65a88?source=your_stories_page-------------------------------------"
              class="map-view__action-button"
            >
              Project page
            </ActionButton>
          </template>
        </InteractibleItem>

        <!-- Notebook Serenity -->
        <InteractibleItem
          id="serenity"
          :height="tileSize * 2"
          :width="tileSize * 2"
          :container-ref="mapView"
          :char-position="charScreenOffset"
          :character-size="charSizePx"
          :action="currentAction"
          :style="{
            left: '31%',
            top: '33%',
          }"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            Serenity: The Impact of the Rubicon Model on the self-care routine
            <br />
            <ActionButton
              href="https://medium.com/@mveigaj.ortiz/serenity-the-impact-of-the-rubicon-model-on-the-self-care-routine-4f56fa5ef07a?source=your_stories_page-------------------------------------"
              class="map-view__action-button"
            >
              Project page
            </ActionButton>
          </template>
        </InteractibleItem>

        <!-- Notebook Ride Capital -->
        <InteractibleItem
          id="ride-capital"
          :height="tileSize * 2"
          :width="tileSize * 2"
          :container-ref="mapView"
          :char-position="charScreenOffset"
          :character-size="charSizePx"
          :action="currentAction"
          :style="{
            left: '56%',
            top: '35.57%',
          }"
        >
          <template #off>
            <Sprite id="notebook-off" />
          </template>
          <template #on>
            <Sprite id="notebook-on" />
          </template>
          <template #dialogue>
            How Ride Capital simplified document uploads for better user
            engagement
            <br />
            <ActionButton
              href="https://medium.com/@mveigaj.ortiz/how-ride-capital-simplified-document-uploads-for-better-user-engagement-b22ecefa6a19"
              class="map-view__action-button"
            >
              Project page
            </ActionButton>
          </template>
        </InteractibleItem>

        <Char
          ref="char"
          :height="tileSize * charSize.y"
          :width="tileSize * charSize.x"
          :action="currentAction"
          :run
          :container-ref="mapView"
          :style="{
            left: `${charOffset.left}px`,
            top: `${charOffset.top}px`,
          }"
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
          :interval="200"
          :interval-animation="1000"
          :animation="Animation.HOVER"
          :style="{
            left: '78%',
            top: '32%',
          }"
        >
          <Sprite id="butterfly-pink-up" />
          <Sprite id="butterfly-pink-down" />
        </AnimatedSprite>

        <!-- Bridge -->
        <AnimatedSprite
          :height="55"
          :width="225"
          style="clip-path: inset(0 0 25% 0)"
          :style="{
            left: '46.71%',
            top: '52.6%',
          }"
        >
          <Sprite id="bridge" />
        </AnimatedSprite>

        <!-- Theo -->
        <AnimatedSprite
          :height="70"
          :width="70"
          :interval-animation="5000"
          :animation="Animation.BUOY"
          :style="{
            left: '60%',
            top: '87%',
          }"
        >
          <Sprite id="theo" />
        </AnimatedSprite>

        <!-- Trees -->
        <AnimatedSprite
          :height="335"
          :width="335"
          style="clip-path: inset(0 0 25% -75%)"
          :style="{
            left: '78.57%',
            top: '33.65%',
          }"
        >
          <Sprite id="trees" />
        </AnimatedSprite>
      </template>
    </Map>
  </div>
</template>

<style lang="scss" scoped>
.map-view {
  margin: 0 auto;
  cursor: var(--cursor-regular);

  &:active {
    cursor: var(--cursor-click);
  }

  &__char {
    transform: translate3d(0, 0, 0);
    will-change: opacity;
    animation: teleport 2s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }

  &__action-button {
    margin-top: 8px;
  }

  &__fullscreen-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    height: 32px;
    width: 32px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 4px;
    color: white;
    padding: 8px;
    transition: background-color 0.2s;
    cursor: var(--cursor-regular);

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }

    &:active {
      cursor: var(--cursor-click);
    }

    &__icon {
      fill: var(--color-background);
    }
  }

  &__controls {
    position: absolute;
    top: 0;
    margin: 0 auto;
  }

  &:fullscreen {
    display: flex;
    align-items: center;
    justify-content: center;

    & .map-view__map {
      width: 100vw;
      aspect-ratio: 16/9;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
