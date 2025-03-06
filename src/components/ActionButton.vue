<script setup lang="ts">
import { event } from "vue-gtag";
import { PORTFOLIO_LINK } from "@/util/events";

const props = defineProps<{
    href: string;
}>()

const handleClick = () => {
    event(PORTFOLIO_LINK, {
        event_category: "click",
        event_label: props.href,
    });
}
</script>

<template>
    <a :href="href" target="_blank" @click="handleClick">
        <slot />
    </a>
</template>

<style lang="scss" scoped>
a {
    color: var(--color-background);
    background-color: var(--color-third);
    padding: 4px 16px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    box-shadow: inset -2px -2px #333, inset 2px 2px var(--color-3-light);
    cursor: var(--cursor-regular);

    &:active {
        cursor: var(--cursor-click);
        box-shadow: inset -2px -2px var(--color-3-light), inset 2px 2px #333;
    }
}
</style>
