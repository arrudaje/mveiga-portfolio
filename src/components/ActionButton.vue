<script setup lang="ts">
import { event } from "vue-gtag";
import { PORTFOLIO_LINK } from "@/util/events";

const props = defineProps<{
    href?: string;
    track?: boolean
}>()

const handleClick = () => {
    props.track && event(PORTFOLIO_LINK, {
        event_category: "click",
        event_label: props.href,
    });
}
</script>

<template>
    <a class="action-button" v-if="href" :href target="_blank" @click="handleClick">
        <slot />
    </a>
    <button class="action-button" v-else @click="handleClick">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.action-button {
    color: var(--color-background);
    background-color: var(--color-third);
    font-family: "04b03";
    padding: 0.3em 1.2em;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    box-shadow: inset -2px -2px #333, inset 2px 2px var(--color-3-light);
    cursor: var(--cursor-regular);

    &:active {
        cursor: var(--cursor-click);
        box-shadow: inset -2px -2px var(--color-3-light), inset 2px 2px #333;
    }
}
</style>
