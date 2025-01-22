<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";
import CharSprites from "@/assets/svg/char-sprites/CharSprites.vue";
import ItemSprites from "@/assets/svg/item-sprites/ItemSprites.vue";
</script>

<template>
  <div class="pixel">
    <CharSprites />
    <ItemSprites />
    <Navigation class="pixel__nav" />
    <RouterView v-slot="{ Component, route }">
      <Transition
        :name="(route.meta?.transition as string) ?? 'fade'"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
.pixel {
  display: flex;
  flex-direction: column;

  &__nav {
    flex: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .scroll-enter-active,
  .scroll-leave-active {
    transition: transform 0.5s ease-out;
  }

  .scroll-enter-from {
    transform: translateY(calc(100% + 115px));
  }

  .scroll-leave-to {
    transform: translateY(calc((100% + 115px) * -1));
  }
}
</style>
