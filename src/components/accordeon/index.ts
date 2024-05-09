import type { InjectionKey, Ref } from "vue";

export const ACCORDEON_OPEN = Symbol() as InjectionKey<Ref<string | undefined>>;