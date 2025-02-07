import { RUN_DURATION, WALK_DURATION } from "@/util/constants";
import { Action } from "@/util/enums";

export const getDuration = (run: boolean) => run ? RUN_DURATION : WALK_DURATION;

export const isMovementAction = (action: Action) => [Action.UP, Action.DOWN, Action.LEFT, Action.RIGHT].includes(action);
