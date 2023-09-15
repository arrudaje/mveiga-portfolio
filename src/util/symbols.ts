import type { InjectionKey } from "vue"

export const CHANGE_THEME = Symbol() as InjectionKey<(value: number) => void>;