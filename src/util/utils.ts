import { RUN_DURATION, WALK_DURATION } from "@/util/constants";

export const getDuration = (run: boolean) => run ? RUN_DURATION : WALK_DURATION;
