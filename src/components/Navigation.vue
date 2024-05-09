<script lang="ts" setup>
import logo from '@/assets/svg/logoPixel.svg';

const navigation = import.meta.env.VITE_USE_NAVIGATION !== '0';
</script>

<template>
    <nav class="navigation">
        <img :src="logo" alt="Logo" class="navigation__logo" />
        <div v-if="navigation" class="navigation__links">
            <router-link :to="{ name: 'home' }" class="navigation__links__link">
                Home
            </router-link>
            <router-link :to="{ name: 'about' }" class="navigation__links__link">
                About Me
            </router-link>
            <router-link :to="{ name: 'studies' }" class="navigation__links__link">
                Case Studies
            </router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navigation {
    display: flex;
    align-items: center;
    padding: 32px 38px;

    &__links {
        display: flex;
        gap: 32px;
        margin-left: auto;

        &__link {
            text-decoration: none;
            transition: color 0.25s ease-out;

            &:visited {
                color: var(--color-text);
            }

            &:hover, &.router-link-exact-active {
                color: var(--color-highlight);
            }
        }
    }
}
</style>