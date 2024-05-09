<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="pixel">
    <Navigation class="pixel__nav" />
    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
.pixel {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__nav {
    flex: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
