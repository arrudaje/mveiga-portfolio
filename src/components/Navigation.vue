<script lang="ts" setup>
import logo from "@/assets/svg/logoPixel.svg";
import { isFeatureEnabled, Feature } from "@/util/feature";
</script>

<template>
  <nav class="navigation">
    <RouterLink :to="{ name: 'home' }">
        <img :src="logo" alt="Logo" class="navigation__logo" />
    </RouterLink>
    <div v-if="isFeatureEnabled(Feature.NAVIGATION)" class="navigation__links">
      <RouterLink :to="{ name: 'home' }" class="navigation__links__link">
        Home
      </RouterLink>
      <RouterLink :to="{ name: 'map' }" class="navigation__links__link">
        Case Studies
      </RouterLink>
      <RouterLink :to="{ name: 'about' }" class="navigation__links__link">
        About Me
      </RouterLink>
      <!-- <RouterLink :to="{ name: 'studies' }" class="navigation__links__link">
        Case Studies
      </RouterLink> -->
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  padding: 32px 38px;
  z-index: 100;

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

      &:hover,
      &.router-link-exact-active {
        color: var(--color-highlight);
      }
    }
  }
}
</style>
