import type { InjectionKey, Ref } from "vue";

export const WALK_DURATION = 300;
export const RUN_DURATION = WALK_DURATION / 2;

export const MAP_DIMENSIONS = Symbol() as InjectionKey<{
  width: number;
  height: number;
}>;
